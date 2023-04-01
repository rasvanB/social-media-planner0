import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Nav = () => {
  const { data } = useSession();
  if (!data) return null;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <Image
          src={data.user.image || "/default-profile.jpg"}
          width={40}
          height={40}
          alt="profile picture"
          className="rounded-full"
        />
        <p className="ml-2 text-lg font-medium text-[#323030]">
          {data.user.username}
        </p>
        <Icon
          icon="mdi:chevron-down"
          className="ml-1 mt-1 text-xl text-[#323030]"
        />
      </div>
      <Image src={"/logo.png"} width="144" height="45" alt="logo" />
      <div className="flex h-fit items-center justify-center rounded-full bg-[#EDF2FF] px-1 py-1">
        <Icon icon="ph:bell-bold" className=" text-[20px] text-[#2F2E6D]" />
        <div className=" ml-1 rounded-full bg-[#6365EF] px-2 py-1 text-center text-xs font-bold leading-tight text-white">
          23
        </div>
      </div>
    </div>
  );
};

export default Nav;
