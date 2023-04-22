import { atom } from "jotai";
import type { PlatformType } from "~/types/post";

export const createModalAtom = atom(false);
export const userSettingsAtom = atom(false);

export const allPlatforms: PlatformType[] = [
  "facebook",
  "instagram",
  "twitter",
];
export const selectedPlatformsAtom = atom<PlatformType[]>(allPlatforms);

const columns = ["schedule", "creation"] as const;
type SortingColumn = (typeof columns)[number];

type Sort = {
  column: SortingColumn;
  ascending: boolean;
};

export const sortingAtom = atom<Sort>({
  column: "schedule",
  ascending: false,
});

export const getAllSortingCombinations = () => {
  const combinations: Sort[] = [];

  for (const column of columns) {
    combinations.push({ column, ascending: true });
    combinations.push({ column, ascending: false });
  }

  return combinations;
};
