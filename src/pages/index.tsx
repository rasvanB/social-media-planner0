import { type NextPage } from "next";
import Header from "~/components/header";
import Hero from "~/components/hero";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="font-inter tracking-tighter">
      <div className="relative h-screen">
        <div className="relative px-2 pt-7 sm:px-10 lg:px-40 xl:px-52">
          <Header />
          <Hero />
          <Link href={"/app"}>
            <button className="absolute left-1/2 mt-10 -translate-x-1/2 transform rounded-lg bg-blue-500 px-10 py-3 font-medium text-white">
              Get Started
            </button>
          </Link>
        </div>
        <Image
          src="/bg.png"
          alt="bg"
          width="1920"
          height="1080"
          className="absolute inset-0 z-[-1] h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
