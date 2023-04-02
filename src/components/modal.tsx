import { Icon } from "@iconify/react";
import { type PropsWithChildren } from "react";

type ModalProps = {
  onClose: () => void;
  title?: string;
} & PropsWithChildren;

const Modal = ({ title, children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30">
      <div className="relative rounded-md bg-white py-2 shadow-xl">
        <div className="flex items-start justify-between px-4">
          {title && (
            <span className="text-xl font-bold text-black/80">{title}</span>
          )}
          <button
            className="rounded-md bg-black/5 p-1 text-black/90 hover:bg-black/10"
            onClick={onClose}
          >
            <Icon icon="mdi:close" className="text-xl" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
