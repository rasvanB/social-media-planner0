import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <div className="font-inter">
      {data?.user.email} {status}
    </div>
  );
};

export default Home;
