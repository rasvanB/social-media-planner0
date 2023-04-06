import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Image from "next/image";
import Button from "./button";
import Error from "./error";
import { postSchema, type ValidPostState, type PostState } from "~/types/post";
import { isFileImage, isFileVideo } from "~/utils/post";
import usePlatforms from "~/hooks/usePlatforms";
import { capitalize } from "~/utils/platform";
import { format } from "date-fns";

type Props = {
  onPost: (data: ValidPostState) => void;
};

const defaultData: PostState = {
  platforms: [],
  message: "",
  file: null,
  scheduledAt: Date.now(),
};

const getLocalString = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");

const PostForm = ({ onPost }: Props) => {
  const [error, setError] = useState("");
  const [data, setData] = useState<PostState>(defaultData);
  const { data: platforms, status } = usePlatforms();

  const options = useMemo(
    () =>
      platforms?.map((p) => ({
        value: p.provider,
        label: capitalize(p.provider),
      })),
    [platforms]
  );

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (status === "error") {
      setError("Error loading platforms");
      return;
    }
    if (!options?.length || !options) {
      setError("No platforms available");
      return;
    }
    setError("");
  }, [options, status]);

  const handlePost = () => {
    const result = postSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Invalid data");
      return;
    }
    setError("");
    onPost(result.data);
  };

  console.log(data);
  return (
    <div>
      <div className="px-4">
        {error && <Error message={error} />}
        <h4 className="mt-3 mb-2 text-sm font-medium leading-none text-[#414141]">
          Choose platforms:
        </h4>
        <Select
          isMulti
          options={options}
          closeMenuOnSelect={false}
          isSearchable={false}
          placeholder="Select platforms..."
          onChange={(e) =>
            setData({ ...data, platforms: e.map((s) => s.value) })
          }
          classNames={{
            multiValueLabel: () => "bg-blue-500/20",
            multiValueRemove: () => "bg-blue-500/20",
          }}
        />
        <h4 className="mt-3 mb-2 text-sm font-medium leading-none text-[#414141]">
          Choose date and time:
        </h4>
        <input
          type="datetime-local"
          className="w-full rounded-md border border-[#cccccc] px-3 py-2 text-sm text-black/80 focus:border-2 focus:border-blue-500 focus:outline-none"
          onChange={(e) => {
            setData({
              ...data,
              scheduledAt:
                e.target.valueAsNumber +
                new Date().getTimezoneOffset() * 60 * 1000,
            });
          }}
          value={getLocalString(new Date(data.scheduledAt))}
          min={getLocalString(new Date())}
        />
        <h4 className="mt-3 mb-2 text-sm font-medium leading-none text-[#414141]">
          Message:
        </h4>
        <textarea
          className="h-24 w-full resize-none rounded-md border border-[#cccccc] px-3 py-2 text-sm text-black/80 focus:border-2 focus:border-blue-500 focus:outline-none"
          placeholder="Enter your message here..."
          value={data.message}
          maxLength={280}
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />
        <h4 className="mt-3 mb-2 text-sm font-medium leading-none text-[#414141]">
          Upload Photo or Video:
        </h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file"
              className="hidden"
              accept="image/png,image/jpeg,video/mp4"
              onChange={(e) =>
                setData({ ...data, file: e.target.files?.[0] ?? null })
              }
            />
            <label
              htmlFor="file"
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-md bg-black/5 text-[#555555] hover:bg-black/10"
            >
              <Icon icon="mdi:plus" className="text-[19px]" />
            </label>
            <div className="flex w-full flex-col">
              {data.file ? (
                <div className="flex items-center gap-2 rounded-md p-1 outline outline-1 outline-black/20">
                  {isFileImage(data.file) ? (
                    <Image
                      src={URL.createObjectURL(data.file)}
                      alt="file"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  ) : isFileVideo(data.file) ? (
                    <video
                      src={URL.createObjectURL(data.file)}
                      className="h-12 w-12 rounded-md object-cover"
                      controls={false}
                      disablePictureInPicture
                    />
                  ) : null}

                  <span className="w-full max-w-[200px] truncate text-sm font-medium leading-none text-black/80">
                    {data.file.name}
                  </span>
                </div>
              ) : (
                <>
                  <span className="text-sm font-medium leading-none text-black/80">
                    Add Photo or Video
                  </span>
                  <span className="text-xs font-medium leading-none text-black/60">
                    PNG, JPG, MP4 up to 5MB
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 h-px w-full bg-[#DBDBDB]" />
      <div className="flex items-center justify-end rounded-b-xl bg-[#F4F4F7] px-4 py-2">
        <Button role="post" text="Post" onClick={handlePost} />
      </div>
    </div>
  );
};

export default PostForm;
