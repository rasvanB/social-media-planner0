/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
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
    <div className="h-screen w-screen px-40">
      <Nav />
    </div>
  );
};

export default App;
