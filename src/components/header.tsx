import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <Image
        src={"/logo.png"}
        width="144"
        height="45"
        alt="logo"
        className="pointer-events-none h-[32px] w-[100px] select-none sm:h-[45px] sm:w-[144px]"
      />
      <div>
        <Link href={"/auth/sign-in"}>
          <button className="font-medium text-blue-600">Login</button>
        </Link>
        <Link href={"/auth/sign-up"}>
          <button className="ml-4 rounded-full bg-blue-500 px-5 py-2 font-medium text-white">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
