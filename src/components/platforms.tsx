/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Account } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Platform, { platforms } from "~/components/platform";

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
    <div className="text-center">
      Platforms
      <div className="mt-2 flex items-center justify-evenly gap-2">
        {platforms.map((platform) => {
          const account = data?.find(
            (account) => account.provider === platform
          );
          return (
            <Platform
              key={platform}
              provider={platform}
              connected={!!account}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Platforms;
