import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "~/utils/services";

const usePosts = () =>
  useQuery(["posts"], () => fetchPosts(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

export default usePosts;
