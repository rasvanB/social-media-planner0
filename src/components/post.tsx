/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import { queryClient } from "~/pages/_app";
import { type PrismaPost } from "~/types/post";
import { icon } from "~/utils/platform";
import { SettingsButton } from "./button";
import { differenceInDays, rtf } from "~/utils/date-time";
import { deletePost } from "~/utils/services";

const Post = ({
  post,
  user,
}: {
  post: PrismaPost;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["posts"]);
      toast.success("Post deleted");
    },
  });

  return (
    <div className="relative w-full rounded-[3px] bg-white px-4 pt-3 pb-2 outline outline-1 outline-[#D8D8D8] md:w-[650px]">
      <div className="flex w-full justify-between">
        <div className="flex justify-start gap-3">
          <Image
            src={user.image || "/default-profile.jpg"}
            width={40}
            height={40}
            alt={"avatar"}
            className="h-[40px] w-[40px] select-none rounded-full object-cover"
          />
          <div className="">
            <div className="text-sm font-medium leading-none">
              {user.name}
              <div className="ml-1 inline">
                {post.platforms.map((platform) => (
                  <Icon
                    icon={icon(platform.name)}
                    key={platform.name + post.id}
                    className="ml-1 inline-block text-xs xs:text-sm"
                  />
                ))}
              </div>
            </div>
            <>
              <Icon
                icon="ic:twotone-calendar-month"
                className="inline-block text-[#555555]"
              />
              <span className="ml-1 text-xs font-semibold text-[#555555]">
                {rtf.format(
                  differenceInDays(new Date(post.scheduledAt), new Date()),
                  "day"
                )}
              </span>
            </>
          </div>
        </div>
        <div>
          <button className="mr-1 xs:mr-2">
            <Icon icon="ph:bell-bold" className="text-[19px] text-[#5e5e5e]" />
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon
              icon="ph:dots-three-outline-vertical-fill"
              className="text-[19px] text-[#5e5e5e]"
            />
          </button>
        </div>
      </div>
      <div className="my-3 break-words text-[13px] font-medium leading-tight tracking-tight xs:text-[15px]">
        {post.content}
      </div>
      <div className="flex w-full items-center justify-center rounded-[4px] bg-[#3d3d3d] sm:max-h-[260px]">
        <img
          src={post.media}
          alt="media"
          style={{
            width: "auto",
            borderRadius: "4px",
            objectFit: "cover",
          }}
          className="h-[150px] bg-white xs:h-[260px]"
        />
      </div>
      <div className="mt-1 text-xs font-medium text-black">{`Status: ${
        post.published ? "Posted" : "Scheduled"
      }`}</div>
      {
        <div
          className="absolute top-10 right-2 w-[150px] rounded-[3px] bg-white shadow-md outline outline-1 outline-[#D8D8D8] transition-all duration-100 lg:top-0 lg:left-full lg:ml-2"
          style={{
            visibility: isMenuOpen ? "visible" : "hidden",
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? "translateX(0)" : "translateX(-10px)",
          }}
        >
          <SettingsButton
            icon={
              deletePostMutation.isIdle ? "ph:trash-bold" : "eos-icons:loading"
            }
            text={deletePostMutation.isIdle ? "Delete" : "Deleting..."}
            onClick={() => deletePostMutation.mutate(post.id)}
          />
        </div>
      }
    </div>
  );
};

export default Post;
