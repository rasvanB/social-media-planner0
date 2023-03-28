import { Icon } from "@iconify/react";
import { type Account } from "@prisma/client";
import { z } from "zod";

const platforms = z.enum(["facebook", "instagram", "twitter"]);
type Platform = z.infer<typeof platforms>;

const platformIcons: Record<Platform, string> = {
  facebook: "logos:facebook",
  instagram: "skill-icons:instagram",
  twitter: "logos:twitter",
};

const icon = (platform: string) => {
  const res = platforms.safeParse(platform);
  if (!res.success) return "emojione-v1:question-mark";
  return platformIcons[res.data];
};

const Platform = ({ account }: { account: Account }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-full py-1 px-3 outline outline-1 outline-gray-300">
        not connected
      </div>
      <div className="w-fit rounded-lg p-2 outline outline-1 outline-gray-300">
        <Icon icon={icon(account.provider)} className="text-[48px]" />
      </div>
    </div>
  );
};

export default Platform;
