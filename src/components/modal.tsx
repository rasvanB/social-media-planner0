import { Icon } from "@iconify/react";
import { useState, type PropsWithChildren } from "react";
import { type ValidPostState } from "~/types/post";
import Platforms from "./platforms";
import PostForm from "./post-form";
import UploadPost from "./upload-post";

type ModalProps = {
  onClose: () => void;
  title?: string;
} & PropsWithChildren;

const Modal = ({ title, children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30">
      <div className="relative w-full rounded-xl bg-white pt-2 shadow-xl xs:w-fit xs:min-w-[300px]">
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

type State =
  | {
      step: "form";
      postData: null;
    }
  | {
      step: "upload";
      postData: ValidPostState;
    };

export const SchedulePostModal = ({ onClose }: ModalProps) => {
  const [state, setState] = useState<State>({ step: "form", postData: null });

  return (
    <Modal title="Create a Post" onClose={onClose}>
      {state.step === "form" ? (
        <PostForm
          onPost={(post) => setState({ step: "upload", postData: post })}
        />
      ) : (
        <UploadPost post={state.postData} />
      )}
    </Modal>
  );
};

export const UserSettingsModal = ({ onClose }: ModalProps) => {
  return (
    <Modal title="User Settings" onClose={onClose}>
      <div className="px-4 py-3">
        <Platforms />
      </div>
    </Modal>
  );
};

export default Modal;
