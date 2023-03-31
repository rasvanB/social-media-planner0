import { type PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex max-w-[400px] flex-col rounded-lg p-5 shadow-xl outline outline-1 outline-black/5">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
