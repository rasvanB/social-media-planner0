/* eslint-disable @typescript-eslint/no-misused-promises */
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";
import { capitalize, icon, type Platform } from "~/utils/platform";
import { ConnectButton, ConnectedButton } from "./button";

const Platform = ({
  provider,
  connected,
}: {
  provider: Platform;
  connected: boolean;
}) => {
  return (
    <div className="flex min-w-[105px] flex-col items-center gap-2">
      {connected ? (
        <ConnectedButton onClick={() => 0} />
      ) : (
        <ConnectButton
          onClick={() => signIn(provider, { callbackUrl: "/app" })}
        />
      )}

      <Icon icon={icon(provider)} className="mt-1 text-[30px]" />
      <span className="text-[16px] font-medium text-gray-600">
        {capitalize(provider)}
      </span>
    </div>
  );
};

export default Platform;
