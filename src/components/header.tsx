import Image from "next/image";

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
        <button className="font-medium text-blue-600">Login</button>
        <button className="ml-4 rounded-full bg-blue-500 px-5 py-2 font-medium text-white">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Header;
