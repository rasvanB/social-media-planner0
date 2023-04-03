import { useAtom } from "jotai";
import { createModalAtom } from "~/utils/jotai";
import { ScheduleButton } from "./button";

const ButtonGroup = () => {
  const [, setCreateModalOpen] = useAtom(createModalAtom);

  return (
    <div className="mt-7 flex w-full justify-between">
      <ScheduleButton onClick={() => setCreateModalOpen(true)} />
      <div className="flex gap-2"></div>
    </div>
  );
};

export default ButtonGroup;
