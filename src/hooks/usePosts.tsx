import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "~/utils/services";

const usePosts = () =>
  useQuery(["posts"], () => fetchPosts(), {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

export default usePosts;
