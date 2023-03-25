import { buttonStyles, type ButtonType } from "~/styles/input-styles";
import { Icon } from "@iconify/react";
type Props = {
  role: ButtonType;
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ role, text, ...other }: Props) => {
  return (
    <button {...other} className={buttonStyles({ intent: role })}>
      {other.disabled && (
        <Icon
          icon="material-symbols:lock"
          className="mr-3 -ml-1 h-5 w-5 text-white text-opacity-30"
        />
      )}
      {text}
    </button>
  );
};

export default Button;
