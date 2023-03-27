/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Account } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  userID: string;
};

const fetchAccounts = async (userID: string) => {
  try {
    const { data } = await axios.get<Account[]>(`/api/user/${userID}/accounts`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const Platforms = ({ userID }: Props) => {
  const { data, status } = useQuery(["platforms", userID], () =>
    fetchAccounts(userID)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Platforms
      {data?.map((account) => (
        <div key={account.id}>{account.provider}</div>
      ))}
    </div>
  );
};
export default Platforms;
