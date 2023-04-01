import { buttonStyles, type ButtonType } from "~/styles/input-styles";
import { Icon } from "@iconify/react";

type Props = {
  role: ButtonType;
  text?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ role, text, children, ...other }: Props) => {
  return (
    <button {...other} className={buttonStyles({ intent: role })}>
      {other.disabled && (
        <Icon
          icon="material-symbols:lock"
          className="mr-3 -ml-1 h-5 w-5 text-white text-opacity-30"
        />
      )}
      {text ? text : ""}
      {children}
    </button>
  );
};

export const ConnectedButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button role="connected" onClick={onClick}>
      <Icon icon="fluent:checkmark-12-regular" className="mr-1 text-xl" />
      <span className="text-sm leading-tight">Connected</span>
    </Button>
  );
};

export const ConnectButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button role="connect" onClick={onClick}>
      <Icon icon="ic:round-plus" className="mr-1 text-xl" />
      <span className="text-sm leading-tight">Connect</span>
    </Button>
  );
};

export const ScheduleButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button role="schedule" onClick={onClick}>
      <Icon icon="heroicons:pencil-square-20-solid" className="mr-2 text-xl" />
      <span className="text-sm font-medium leading-tight">
        Schedule a new post
      </span>
    </Button>
  );
};

export const SettingsButton = ({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <button className={buttonStyles({ intent: "account" })} onClick={onClick}>
      <span>{text}</span>
      <Icon icon={icon} className="text-lg" />
    </button>
  );
};

export default Button;
