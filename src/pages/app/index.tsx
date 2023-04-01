/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import ButtonGroup from "~/components/button-group";
import Nav from "~/components/nav";

const App: NextPage = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="h-screen w-screen px-10 lg:px-40">
      <Nav />
      <ButtonGroup />
      <div className="my-3 h-px w-full bg-[#DBDBDB]" />
    </div>
  );
};

export default App;
