import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type PrismaPost } from "~/types/post";

const fetchPosts = async () => {
  try {
    const { data } = await axios.get<PrismaPost[]>(`/api/me/posts`);
    return data.map((post) => ({
      ...post,
      scheduledAt: Number(post.scheduledAt),
    }));
  } catch (error) {
    return [];
  }
};

const usePosts = () =>
  useQuery(["posts"], () => fetchPosts(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

export default usePosts;
