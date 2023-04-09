import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Account } from "next-auth";

const fetchAccounts = async () => {
  try {
    const { data } = await axios.get<Account[]>(`/api/me/accounts`);
    return data;
  } catch (error) {
    return [];
  }
};

const usePlatforms = () => useQuery(["platforms"], () => fetchAccounts());

export default usePlatforms;
