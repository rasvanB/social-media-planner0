import { type Account } from "@prisma/client";
const Platform = ({ account }: { account: Account }) => {
  return <div>{account.provider}</div>;
};

export default Platform;
