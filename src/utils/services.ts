import type { Account, Post, User } from "@prisma/client";
import axios from "axios";
import type { SignUpSchema } from "~/types/auth-types";
import type { PrismaPost, ValidServerPostState } from "~/types/post";

export const deletePost = async (id: string) =>
  await axios.delete(`/api/post/${id}`);

export const createPost = async ({
  userId,
  post,
}: {
  userId: string;
  post: ValidServerPostState;
}) => {
  const { data } = await axios.post<Post>(`/api/user/${userId}/posts`, post);
  return { ...data, scheduledAt: Number(data.scheduledAt) };
};

export const fetchAccounts = async () => {
  try {
    const { data } = await axios.get<Account[]>(`/api/me/accounts`);
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchPosts = async () => {
  try {
    const { data } = await axios.get<PrismaPost[]>(`/api/me/posts`);
    return data.map((post) => ({
      ...post,
      scheduledAt: Number(post.scheduledAt),
      createdAt: Number(post.createdAt),
    }));
  } catch (error) {
    return [];
  }
};

export const signUp = async (data: SignUpSchema) => {
  try {
    await axios.post<User>("/api/auth", data);
  } catch (error) {
    throw error;
  }
};

export const sendResetPasswordEmail = async (email: string) => {
  const { data } = await axios.post<unknown>(`/api/send-email`, {
    email,
  });
  return data;
};

export const resetPassword = async ({
  password,
  userId,
}: {
  password: string;
  userId: string;
}) => {
  const { data } = await axios.post<unknown>(
    `/api/user/${userId}/reset-password`,
    {
      password,
    }
  );
  return data;
};
