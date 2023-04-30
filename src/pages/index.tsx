import { type NextPage } from "next";
import Header from "~/components/header";
import Hero from "~/components/hero";

const Home: NextPage = () => {
  return (
    <div className="px-2 pt-7 font-inter tracking-tighter sm:px-10 lg:px-40 xl:px-52">
      <div className="h-screen">
        <Header />
        <Hero />
      </div>
    </div>
  );
};

export default Home;
