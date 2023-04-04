import { Icon } from "@iconify/react";
import { type PropsWithChildren } from "react";
import PostForm from "./post-form";

type ModalProps = {
  onClose: () => void;
  title?: string;
} & PropsWithChildren;

const Modal = ({ title, children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30">
      <div className="relative w-full rounded-xl bg-white py-2 shadow-xl xs:w-fit xs:min-w-[300px]">
        <div className="flex w-full items-center justify-between px-4">
          {title && (
            <>
              <span className="text-2xl font-bold leading-none text-black/80">
                {title}
              </span>
            </>
          )}
          <button
            className="ml-auto rounded-md bg-black/5 p-1.5 text-[#555555] hover:bg-black/10"
            onClick={onClose}
          >
            <Icon icon="mdi:close" className=" text-[19px]" />
          </button>
        </div>
        <div className="mt-3 h-px w-full bg-[#DBDBDB]" />
        {children}
      </div>
    </div>
  );
};

export const SchedulePostModal = ({ onClose }: ModalProps) => {
  return (
    <Modal title="Schedule a Post" onClose={onClose}>
      <PostForm />
    </Modal>
  );
};
export default Modal;
