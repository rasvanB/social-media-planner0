/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAtom } from "jotai/react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import ButtonGroup from "~/components/button-group";
import { SchedulePostModal, UserSettingsModal } from "~/components/modal";
import Nav from "~/components/nav";
import Posts from "~/components/posts";
import { createModalAtom, userSettingsAtom } from "~/utils/jotai";

const App: NextPage = () => {
  const { data, status } = useSession();
  const [createModalOpen, setCreateModalOpen] = useAtom(createModalAtom);
  const [userSettingsOpen, setUserSettingsOpen] = useAtom(userSettingsAtom);

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
      {userSettingsOpen && (
        <UserSettingsModal onClose={() => setUserSettingsOpen(false)} />
      )}
      <div className="px-2 sm:px-10 lg:px-40 xl:px-60">
        <Nav />
        <ButtonGroup />
      </div>
      <div className="mt-3 h-px w-full bg-[#DBDBDB]" />
      <div className="h-full w-full bg-[#ECECEC]">
        <Posts />
      </div>
    </div>
  );
};

export default App;
