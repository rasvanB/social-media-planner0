import usePosts from "~/hooks/usePosts";

const Posts = () => {
  const { data, status } = usePosts();

  console.log(data);

  if (status === "loading") {
    return <div className="px-2 sm:px-10 lg:px-40 xl:px-60">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="px-2 sm:px-10 lg:px-40 xl:px-60">No posts</div>;
  }

  return (
    <div className="px-2 sm:px-10 lg:px-40 xl:px-60">
      {data.map((post) => (
        <div key={post.id} className="flex items-center gap-2">
          {post.content} - {post.scheduledAt}
        </div>
      ))}
    </div>
  );
};

export default Posts;
