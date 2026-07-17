PRAGMA defer_foreign_keys = ON;

-- Rebuild media instead of altering it in place. The original table requires
-- data BLOB NOT NULL and limits byte_size to 1.5 MB, which prevents R2-only
-- objects and larger private documents.
CREATE TABLE media_next (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK (byte_size > 0),
  alt_text TEXT NOT NULL DEFAULT '',
  purpose TEXT NOT NULL DEFAULT 'post-image'
    CHECK (purpose IN ('post-image', 'profile-image', 'resume', 'document')),
  visibility TEXT NOT NULL DEFAULT 'public'
    CHECK (visibility IN ('public', 'private')),
  storage_provider TEXT NOT NULL DEFAULT 'd1'
    CHECK (storage_provider IN ('d1', 'r2', 'dual')),
  data BLOB,
  r2_key TEXT,
  r2_etag TEXT,
  r2_version TEXT,
  checksum_sha256 TEXT
    CHECK (checksum_sha256 IS NULL OR length(checksum_sha256) = 64),
  uploaded_by_user_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  FOREIGN KEY (uploaded_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  CHECK (
    (storage_provider = 'd1' AND data IS NOT NULL AND r2_key IS NULL) OR
    (storage_provider = 'r2' AND data IS NULL AND r2_key IS NOT NULL) OR
    (storage_provider = 'dual' AND data IS NOT NULL AND r2_key IS NOT NULL)
  )
);

-- Create users while media_next exists so the media/uploader and user/avatar
-- foreign keys can be resolved before the tables are renamed.
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  display_name TEXT NOT NULL
    CHECK (length(trim(display_name)) BETWEEN 1 AND 120),
  password_hash TEXT,
  auth_method TEXT NOT NULL DEFAULT 'password'
    CHECK (auth_method IN ('password', 'email_otp', 'legacy_env')),
  role TEXT NOT NULL DEFAULT 'member'
    CHECK (role IN ('admin', 'editor', 'member')),
  status TEXT NOT NULL DEFAULT 'invited'
    CHECK (status IN ('invited', 'active', 'suspended')),
  avatar_media_id TEXT,
  email_verified_at TEXT,
  last_login_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (avatar_media_id) REFERENCES media_next(id) ON DELETE SET NULL,
  CHECK (auth_method <> 'password' OR password_hash IS NOT NULL)
);

INSERT INTO media_next (
  id,
  filename,
  mime_type,
  byte_size,
  alt_text,
  purpose,
  visibility,
  storage_provider,
  data,
  created_at,
  updated_at
)
SELECT
  id,
  filename,
  mime_type,
  byte_size,
  alt_text,
  'post-image',
  'public',
  'd1',
  data,
  created_at,
  created_at
FROM media;

-- Rebuild posts so its media foreign key follows media_next during the swap
-- and add database-user attribution without losing author_email history.
CREATE TABLE posts_next (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  featured_media_id TEXT,
  author_email TEXT NOT NULL COLLATE NOCASE,
  author_user_id TEXT,
  updated_by_user_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT,
  FOREIGN KEY (featured_media_id) REFERENCES media_next(id) ON DELETE SET NULL,
  FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (updated_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO posts_next (
  id,
  slug,
  title,
  excerpt,
  content,
  status,
  featured_media_id,
  author_email,
  created_at,
  updated_at,
  published_at
)
SELECT
  id,
  slug,
  title,
  excerpt,
  content,
  status,
  featured_media_id,
  author_email,
  created_at,
  updated_at,
  published_at
FROM posts;

DROP TABLE posts;
DROP TABLE media;

ALTER TABLE media_next RENAME TO media;
ALTER TABLE posts_next RENAME TO posts;

CREATE INDEX idx_media_created_at
  ON media(created_at DESC);
CREATE INDEX idx_media_purpose_created_at
  ON media(purpose, created_at DESC);
CREATE INDEX idx_media_uploaded_by_created_at
  ON media(uploaded_by_user_id, created_at DESC);
CREATE UNIQUE INDEX idx_media_r2_key
  ON media(r2_key)
  WHERE r2_key IS NOT NULL;

CREATE INDEX idx_posts_status_published_at
  ON posts(status, published_at DESC);
CREATE INDEX idx_posts_author_user_updated_at
  ON posts(author_user_id, updated_at DESC);

CREATE INDEX idx_users_status_role
  ON users(status, role);

CREATE TABLE job_openings (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL COLLATE NOCASE UNIQUE,
  title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 3 AND 160),
  department TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  employment_type TEXT NOT NULL DEFAULT 'full-time'
    CHECK (
      employment_type IN (
        'full-time',
        'part-time',
        'contract',
        'temporary',
        'internship',
        'other'
      )
    ),
  workplace_type TEXT NOT NULL DEFAULT 'on-site'
    CHECK (workplace_type IN ('on-site', 'hybrid', 'remote')),
  summary TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  responsibilities TEXT NOT NULL DEFAULT '',
  requirements TEXT NOT NULL DEFAULT '',
  salary_text TEXT NOT NULL DEFAULT '',
  featured_media_id TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'closed', 'archived')),
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
  created_by_user_id TEXT,
  created_by_email TEXT NOT NULL COLLATE NOCASE,
  updated_by_user_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT,
  closes_at TEXT,
  FOREIGN KEY (featured_media_id) REFERENCES media(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (updated_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_job_openings_public
  ON job_openings(status, is_featured DESC, published_at DESC);
CREATE INDEX idx_job_openings_closes_at
  ON job_openings(status, closes_at);
CREATE INDEX idx_job_openings_updated_at
  ON job_openings(updated_at DESC);

CREATE TABLE applications (
  id TEXT PRIMARY KEY,
  job_opening_id TEXT,
  job_title_snapshot TEXT NOT NULL,
  applicant_user_id TEXT,
  full_name TEXT NOT NULL CHECK (length(trim(full_name)) BETWEEN 2 AND 160),
  email TEXT COLLATE NOCASE,
  phone TEXT,
  nationality TEXT NOT NULL DEFAULT '',
  current_location TEXT NOT NULL DEFAULT '',
  cover_message TEXT NOT NULL DEFAULT '',
  resume_media_id TEXT,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (
      status IN (
        'new',
        'reviewing',
        'contacted',
        'interviewed',
        'hired',
        'rejected',
        'withdrawn'
      )
    ),
  assigned_to_user_id TEXT,
  private_notes TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'website',
  consent_at TEXT NOT NULL,
  reviewed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (job_opening_id) REFERENCES job_openings(id) ON DELETE SET NULL,
  FOREIGN KEY (applicant_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (resume_media_id) REFERENCES media(id) ON DELETE RESTRICT,
  FOREIGN KEY (assigned_to_user_id) REFERENCES users(id) ON DELETE SET NULL,
  CHECK (
    (email IS NOT NULL AND length(trim(email)) > 0) OR
    (phone IS NOT NULL AND length(trim(phone)) > 0)
  )
);

CREATE INDEX idx_applications_status_created_at
  ON applications(status, created_at DESC);
CREATE INDEX idx_applications_job_status_created_at
  ON applications(job_opening_id, status, created_at DESC);
CREATE INDEX idx_applications_assignee_status
  ON applications(assigned_to_user_id, status, updated_at DESC);
CREATE INDEX idx_applications_email_created_at
  ON applications(email, created_at DESC);

CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL CHECK (length(trim(full_name)) BETWEEN 2 AND 160),
  company_name TEXT NOT NULL DEFAULT '',
  email TEXT COLLATE NOCASE,
  phone TEXT,
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL CHECK (length(trim(message)) BETWEEN 10 AND 10000),
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'in_progress', 'resolved', 'spam')),
  assigned_to_user_id TEXT,
  source_page TEXT NOT NULL DEFAULT '',
  consent_at TEXT NOT NULL,
  resolved_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (assigned_to_user_id) REFERENCES users(id) ON DELETE SET NULL,
  CHECK (
    (email IS NOT NULL AND length(trim(email)) > 0) OR
    (phone IS NOT NULL AND length(trim(phone)) > 0)
  )
);

CREATE INDEX idx_inquiries_status_created_at
  ON inquiries(status, created_at DESC);
CREATE INDEX idx_inquiries_assignee_status
  ON inquiries(assigned_to_user_id, status, updated_at DESC);
CREATE INDEX idx_inquiries_email_created_at
  ON inquiries(email, created_at DESC);

CREATE TABLE forum_topics (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL COLLATE NOCASE UNIQUE,
  author_user_id TEXT,
  author_name_snapshot TEXT NOT NULL,
  title TEXT NOT NULL CHECK (length(trim(title)) BETWEEN 3 AND 180),
  body TEXT NOT NULL CHECK (length(trim(body)) BETWEEN 10 AND 50000),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (
      status IN ('draft', 'pending', 'open', 'locked', 'hidden', 'deleted')
    ),
  is_pinned INTEGER NOT NULL DEFAULT 0 CHECK (is_pinned IN (0, 1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT,
  last_activity_at TEXT NOT NULL,
  FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_forum_topics_public
  ON forum_topics(status, is_pinned DESC, last_activity_at DESC);
CREATE INDEX idx_forum_topics_author_created_at
  ON forum_topics(author_user_id, created_at DESC);

CREATE TABLE forum_comments (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL,
  parent_comment_id TEXT,
  author_user_id TEXT,
  author_name_snapshot TEXT NOT NULL,
  body TEXT NOT NULL CHECK (length(trim(body)) BETWEEN 1 AND 10000),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'published', 'hidden', 'deleted')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  edited_at TEXT,
  FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_comment_id) REFERENCES forum_comments(id) ON DELETE SET NULL,
  FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE SET NULL,
  CHECK (parent_comment_id IS NULL OR parent_comment_id <> id)
);

CREATE INDEX idx_forum_comments_topic_status_created_at
  ON forum_comments(topic_id, status, created_at);
CREATE INDEX idx_forum_comments_parent_created_at
  ON forum_comments(parent_comment_id, created_at);
CREATE INDEX idx_forum_comments_author_created_at
  ON forum_comments(author_user_id, created_at DESC);

CREATE TRIGGER forum_comments_parent_topic_insert
BEFORE INSERT ON forum_comments
WHEN NEW.parent_comment_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM forum_comments AS parent
    WHERE parent.id = NEW.parent_comment_id
      AND parent.topic_id = NEW.topic_id
  )
BEGIN
  SELECT RAISE(ABORT, 'Parent comment must belong to the same topic');
END;

CREATE TRIGGER forum_comments_parent_topic_update
BEFORE UPDATE OF parent_comment_id, topic_id ON forum_comments
WHEN NEW.parent_comment_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM forum_comments AS parent
    WHERE parent.id = NEW.parent_comment_id
      AND parent.topic_id = NEW.topic_id
  )
BEGIN
  SELECT RAISE(ABORT, 'Parent comment must belong to the same topic');
END;

CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT,
  actor_email_snapshot TEXT COLLATE NOCASE,
  action TEXT NOT NULL CHECK (length(trim(action)) BETWEEN 1 AND 100),
  entity_type TEXT NOT NULL CHECK (length(trim(entity_type)) BETWEEN 1 AND 80),
  entity_id TEXT,
  outcome TEXT NOT NULL DEFAULT 'success'
    CHECK (outcome IN ('success', 'failure')),
  request_id TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}'
    CHECK (json_valid(metadata_json)),
  created_at TEXT NOT NULL,
  FOREIGN KEY (actor_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_audit_logs_created_at
  ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_actor_created_at
  ON audit_logs(actor_user_id, created_at DESC);
CREATE INDEX idx_audit_logs_entity_created_at
  ON audit_logs(entity_type, entity_id, created_at DESC);
CREATE INDEX idx_audit_logs_request_id
  ON audit_logs(request_id);

PRAGMA defer_foreign_keys = OFF;
PRAGMA foreign_key_check;
