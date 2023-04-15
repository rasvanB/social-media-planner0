import { type Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  try {
    const { data } = await axios.get<Post[]>(`/api/me/posts`);
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
    refetchOnReconnect: false,
    retry: false,
  });

export default usePosts;
