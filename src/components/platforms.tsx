/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Account } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  userID: string;
};

const fetchAccounts = async (userID: string) => {
  const { data } = await axios.get<Account[]>(`/api/user/${userID}/accounts`);
  return data;
};

const Platforms = ({ userID }: Props) => {
  const { data, status } = useQuery(["platforms", userID], () =>
    fetchAccounts(userID)
  );

  console.log(data, status);

  return <div>Platforms</div>;
};
export default Platforms;
