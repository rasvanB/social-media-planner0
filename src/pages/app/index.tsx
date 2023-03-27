/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Platforms from "~/components/platforms";

const App: NextPage = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <h1>App</h1>
      <p>{data.user.username}</p>
      <button
        className="p-2 outline outline-1 outline-neutral-300"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <Platforms userID={data.id} />
    </div>
  );
};

export default App;
