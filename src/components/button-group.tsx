import { ScheduleButton } from "./button";

const ButtonGroup = () => {
  return (
    <div className="mt-7 flex w-full justify-between">
      <ScheduleButton />
      <div className="flex gap-2"></div>
    </div>
  );
};

export default ButtonGroup;
