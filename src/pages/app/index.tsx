/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ButtonGroup from "~/components/button-group";
import ModalArea from "~/components/modal-area";
import Nav from "~/components/nav";
import Posts from "~/components/posts";

const App: NextPage = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <Toaster position="top-center" />
      <ModalArea />
      <div className="px-2 sm:px-10 lg:px-40 xl:px-60">
        <Nav />
        <ButtonGroup />
      </div>
      <div className="mt-3 h-px w-full bg-[#DBDBDB]" />
      <div className="h-full w-full overflow-x-hidden bg-[#ECECEC] pb-5 pt-3">
        <Posts />
      </div>
    </div>
  );
};

export default App;
