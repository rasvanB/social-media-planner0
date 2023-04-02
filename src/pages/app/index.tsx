/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAtom } from "jotai/react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import ButtonGroup from "~/components/button-group";
import Modal from "~/components/modal";
import Nav from "~/components/nav";
import { createModalAtom } from "~/utils/jotai";

const App: NextPage = () => {
  const { data, status } = useSession();
  const [createModalOpen, setCreateModalOpen] = useAtom(createModalAtom);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="h-screen w-screen px-2 sm:px-10 lg:px-40">
      {createModalOpen && (
        <Modal
          title="Schedule a post"
          onClose={() => setCreateModalOpen(false)}
        ></Modal>
      )}
      <Nav />
      <ButtonGroup />
      <div className="my-3 h-px w-full bg-[#DBDBDB]" />
    </div>
  );
};

export default App;
