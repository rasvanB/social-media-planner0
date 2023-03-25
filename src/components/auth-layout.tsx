import { type PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col p-2 shadow-lg">{children}</div>
    </div>
  );
};

export default AuthLayout;
