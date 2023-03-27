/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Account } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Platform from "~/components/platform";
import { signIn } from "next-auth/react";

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
        <Platform key={account.id} account={account} />
      ))}
      <div className="flex flex-col gap-2">
        <button onClick={() => signIn("facebook")}>Connect Facebook</button>
        <button onClick={() => signIn("instagram")}>Connect Instagram</button>
        <button onClick={() => signIn("twitter")}>Connect Twitter</button>
      </div>
    </div>
  );
};
export default Platforms;
