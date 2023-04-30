import { type NextPage } from "next";
import Header from "~/components/header";

const Home: NextPage = () => {
  return (
    <div className="px-2 pt-7 font-inter tracking-tighter sm:px-10 lg:px-40 xl:px-52">
      <Header />
    </div>
  );
};

export default Home;
