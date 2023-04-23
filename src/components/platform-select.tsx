import { Icon } from "@iconify/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { allPlatforms, selectedPlatformsAtom } from "~/utils/jotai";
import { capitalize } from "~/utils/platform";

const checkSameArray = (arr1: unknown[], arr2: unknown[]) => {
  if (arr1.sort().join(",") === arr2.sort().join(",")) return true;
  return false;
};

const PlatformSelect = () => {
  const [platform, setPlatform] = useAtom(selectedPlatformsAtom);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative z-20 flex min-h-[43px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded border border-[#D8D8D8] px-2 xs:w-[300px]"
      style={{
        borderColor: open ? "#6B6CCF" : "#D8D8D8",
      }}
    >
      <Icon icon={"ph:stack-bold"} className="text-xl text-[#6B6CCF]" />
      <span className="text-[16px] font-medium text-[#121212]">Platforms:</span>
      <div className=" rounded-full bg-[#EDF2FF] px-2 py-1 text-center text-[14px] font-medium leading-none text-[#2F2E6D] outline outline-1 outline-[#D1D7F2]">
        {checkSameArray(platform, allPlatforms)
          ? "All platforms"
          : platform.map((p) => capitalize(p)).join(", ")}
      </div>
      <button onClick={() => setOpen(!open)}>
        <Icon
          icon={"material-symbols:keyboard-arrow-down-rounded"}
          className="text-2xl text-[#6B6CCF] transition-transform duration-100"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="absolute top-[calc(100%-2px)] w-[calc(100%+2px)] rounded-b-[3px] border border-[#6B6CCF] border-t-[#D8D8D8] bg-white px-3 py-2">
          <span className="text-sm font-medium text-[#717171]">
            Select platforms:
          </span>
          {allPlatforms.map((p) => (
            <div key={p} className="mt-2 flex select-none items-center gap-1">
              <input
                type="checkbox"
                checked={platform.includes(p)}
                onChange={() => {
                  if (platform.includes(p)) {
                    if (platform.length === 1) return;
                    setPlatform(platform.filter((pl) => pl !== p));
                  } else {
                    setPlatform([...platform, p]);
                  }
                }}
                className="h-[15px] w-[15px] checked:bg-red-500"
              />
              <label className="ml-1 text-sm font-medium text-[#2F2E6D]">
                {capitalize(p)}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlatformSelect;
