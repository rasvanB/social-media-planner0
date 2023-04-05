/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAtom } from "jotai/react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import ButtonGroup from "~/components/button-group";
import { SchedulePostModal } from "~/components/modal";
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
    <div className="flex h-screen w-screen flex-col">
      {createModalOpen && (
        <SchedulePostModal onClose={() => setCreateModalOpen(false)} />
      )}
      <div className="px-2 sm:px-10 lg:px-40 xl:px-60">
        <Nav />
        <ButtonGroup />
      </div>
      <div className="mt-3 h-px w-full bg-[#DBDBDB]" />
      <div className="h-full w-full bg-[#ECECEC]"></div>
    </div>
  );
};

export default App;
