import { useSession } from "next-auth/react";
import usePosts from "~/hooks/usePosts";
import Post from "./post";

const Posts = () => {
  const session = useSession();
  const { data, status } = usePosts();

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

  return (
    <div className="mt-2 px-2 sm:px-10 lg:px-40 xl:px-60">
      <div className="flex flex-col items-center gap-3">
        {data.map((post) => (
          <Post
            key={post.id}
            post={post}
            user={{
              id: session.data.user.id,
              name: session.data.user.username,
              image: session.data.user.image,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
