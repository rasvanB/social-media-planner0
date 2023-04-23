import { useQuery } from "@tanstack/react-query";
import { fetchAccounts } from "~/utils/services";

const usePlatforms = () =>
  useQuery(["platforms"], () => fetchAccounts(), {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

export default usePlatforms;
