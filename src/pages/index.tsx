import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data, status } = useSession();
  console.log(data);
  return (
    <>
      {data?.user.email} {status}
    </>
  );
};

export default Home;
