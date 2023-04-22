import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import usePosts from "~/hooks/usePosts";
import { selectedPlatformsAtom, sortingAtom } from "~/utils/jotai";
import Post from "./post";

const Posts = () => {
  const session = useSession();
  const { data, status } = usePosts();
  const [selectedPlatforms] = useAtom(selectedPlatformsAtom);
  const [sortingCriteria] = useAtom(sortingAtom);

  if (status === "loading" || !session || !session.data) {
    return (
      <div className="mt-3 flex flex-col items-center px-2 text-center text-xl font-semibold text-black/50 sm:px-10 lg:px-40 xl:px-60">
        Loading...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-3 flex flex-col items-center px-2 text-center text-xl font-semibold text-black/50 sm:px-10 lg:px-40 xl:px-60">
        {
          "You don't have any posts yet. Create one by clicking the button above."
        }
      </div>
    );
  }

  const filteredData = data.filter((post) => {
    const postPlatforms = post.platforms.map((platform) => platform.name);

    return selectedPlatforms.some((platform) =>
      postPlatforms.includes(platform)
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    switch (sortingCriteria.column) {
      case "schedule":
        return sortingCriteria.ascending
          ? a.scheduledAt - b.scheduledAt
          : b.scheduledAt - a.scheduledAt;
      case "creation":
        return sortingCriteria.ascending
          ? a.createdAt - b.createdAt
          : b.createdAt - a.createdAt;
    }
  });

  return (
    <div className="mt-2 px-2 sm:px-10 lg:px-40 xl:px-60">
      <div className="flex flex-col items-center gap-3">
        {sortedData.length > 0 ? (
          sortedData.map((post) => (
            <Post
              key={post.id}
              post={post}
              user={{
                id: session.data.user.id,
                name: session.data.user.username,
                image: session.data.user.image,
              }}
            />
          ))
        ) : (
          <div className="mt-3 flex flex-col items-center px-2 text-center text-xl font-semibold text-black/50">
            {
              "No posts matching your selected platforms. Try selecting different platforms."
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
