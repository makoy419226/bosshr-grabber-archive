import { createServerFn } from "@tanstack/react-start";
import { loginInputSchema, postIdSchema, postInputSchema, postSlugSchema } from "./cms";
import {
  createPost,
  deletePost,
  getAdmin,
  getPublishedPost,
  listAllPosts,
  listMedia,
  listPublishedPosts,
  loginAdmin,
  logoutAdmin,
  updatePost,
} from "./cms.server";

export const getPublicPosts = createServerFn({ method: "GET" }).handler(async () => {
  return listPublishedPosts();
});

export const getPublicPost = createServerFn({ method: "GET" })
  .validator(postSlugSchema)
  .handler(async ({ data }) => getPublishedPost(data.slug));

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  return getAdmin();
});

export const loginToCms = createServerFn({ method: "POST" })
  .validator(loginInputSchema)
  .handler(async ({ data }) => loginAdmin(data.email, data.password));

export const logoutFromCms = createServerFn({ method: "POST" }).handler(async () => {
  await logoutAdmin();
  return { success: true };
});

export const getCmsDashboard = createServerFn({ method: "GET" }).handler(async () => {
  const [posts, media, admin] = await Promise.all([listAllPosts(), listMedia(), getAdmin()]);
  if (!admin) throw new Error("Unauthorized");
  return { posts, media, admin };
});

export const saveCmsPost = createServerFn({ method: "POST" })
  .validator(postInputSchema)
  .handler(async ({ data }) => {
    if (data.id) return updatePost({ ...data, id: data.id });
    return createPost(data);
  });

export const removeCmsPost = createServerFn({ method: "POST" })
  .validator(postIdSchema)
  .handler(async ({ data }) => {
    await deletePost(data.id);
    return { success: true };
  });
