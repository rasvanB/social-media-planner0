import { Icon } from "@iconify/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { getAllSortingCombinations, sortingAtom } from "~/utils/jotai";
import { capitalize } from "~/utils/platform";

const SortInput = () => {
  const [sortingCriteria, setSortingCriteria] = useAtom(sortingAtom);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative z-10 flex min-h-[43px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded border border-[#D8D8D8] px-2 xs:w-[280px]"
      style={{
        borderColor: open ? "#6B6CCF" : "#D8D8D8",
      }}
    >
      <Icon
        icon={"fluent:arrow-sort-16-filled"}
        className="text-[16px] text-[#6B6CCF]"
      />
      <span className="text-[16px] font-medium leading-none text-[#121212]">
        Sort by:
      </span>
      <div className=" rounded-full bg-[#EDF2FF] px-2 py-1 text-center text-[14px] font-medium leading-none text-[#2F2E6D] outline outline-1 outline-[#D1D7F2]">
        {`${sortingCriteria.column} ${
          sortingCriteria.ascending ? "ascending" : "descending"
        }`}
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
            Select platforms
          </span>
          {getAllSortingCombinations().map((p) => (
            <div
              key={p.column + (p.ascending ? "asc" : "desc")}
              className="mt-2 flex select-none items-center gap-1"
            >
              <input
                type="checkbox"
                checked={
                  sortingCriteria.column === p.column &&
                  sortingCriteria.ascending === p.ascending
                }
                onChange={() => setSortingCriteria(p)}
                className="h-[15px] w-[15px]"
              />
              <label className="ml-1 text-sm font-medium text-[#2F2E6D]">
                {capitalize(p.column) +
                  (p.ascending ? " ascending" : " descending")}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortInput;
