import { cva, type VariantProps } from "class-variance-authority";

export const inputStyles = cva("", {
  variants: {
    intent: {
      auth: "relative mt-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none",
    },
  },
});

export const buttonStyles = cva("", {
  variants: {
    intent: {
      auth: "group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:hover:bg-indigo-600",
      connected:
        "flex items-center justify-center bg-white rounded-full px-2 py-1 text-green-500 w-full outline outline-1 outline-black/10",
      connect:
        "flex items-center justify-center rounded-full px-2 py-1 text-white bg-[#1096FC] hover:bg-[#36a3f7] w-full",
      schedule:
        "flex items-center justify-center w-fit transition-all duration-100 active:ring-2 active:ring-offset-2 active:ring-[#7d7ff1]  px-4 py-2.5 rounded-md text-white bg-[#6365EF] hover:bg-[#6f71eb]",
      account:
        "flex w-full items-center justify-between px-4 py-2 font-medium text-sm text-[#666] hover:bg-[#fcfcfc] hover:text-black",
    },
  },
});

export type InputType = NonNullable<VariantProps<typeof inputStyles>["intent"]>;
export type ButtonType = NonNullable<
  VariantProps<typeof buttonStyles>["intent"]
>;
