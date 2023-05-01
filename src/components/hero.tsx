const Hero = () => {
  return (
    <div>
      <div className="mt-32 text-center text-7xl font-semibold text-black/90 even:ml-2">
        Create once, <br />
        <span>
          post{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            everywhere
          </span>
        </span>
        .
      </div>
      <div className="mt-6 text-center text-xl tracking-normal text-black/90">
        Stay Ahead of the Social Media Game:{" "}
        <span className="text-blue-600 underline underline-offset-4">Plan</span>
        ,{" "}
        <span className="text-blue-600 underline underline-offset-4">
          Schedule
        </span>
        , and{" "}
        <span className="text-blue-600 underline underline-offset-4">Post</span>{" "}
        with Wave
      </div>
    </div>
  );
};

export default Hero;
