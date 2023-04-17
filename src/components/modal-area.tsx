import { useAtom } from "jotai";
import { createModalAtom, userSettingsAtom } from "~/utils/jotai";
import { SchedulePostModal, UserSettingsModal } from "./modal";

const ModalArea = () => {
  const [createModalOpen, setCreateModalOpen] = useAtom(createModalAtom);
  const [userSettingsOpen, setUserSettingsOpen] = useAtom(userSettingsAtom);

  return (
    <>
      {createModalOpen && (
        <SchedulePostModal onClose={() => setCreateModalOpen(false)} />
      )}
      {userSettingsOpen && (
        <UserSettingsModal onClose={() => setUserSettingsOpen(false)} />
      )}
    </>
  );
};

export default ModalArea;
