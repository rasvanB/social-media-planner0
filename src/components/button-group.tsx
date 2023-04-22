import { useAtom } from "jotai";
import { createModalAtom } from "~/utils/jotai";
import { ScheduleButton } from "./button";
import PlatformSelect from "./platform-select";
import SortInput from "./sort-input";

const ButtonGroup = () => {
  const [, setCreateModalOpen] = useAtom(createModalAtom);

  return (
    <div className="mt-7 flex w-full flex-col flex-wrap justify-between gap-2 md:flex-row">
      <ScheduleButton onClick={() => setCreateModalOpen(true)} />
      <div className="flex flex-wrap gap-2">
        <PlatformSelect />
        <SortInput />
      </div>
    </div>
  );
};

export default ButtonGroup;
