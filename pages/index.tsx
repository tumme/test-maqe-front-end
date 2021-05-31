import Head from "next/head";
import { useQuery } from "react-query";
import * as dayjs from "dayjs";

const fetchPosts = async () => {
  const res = await fetch("http://maqe.github.io/json/posts.json");
  return res.json();
};
const fetchAuthors = async () => {
  const res = await fetch("http://maqe.github.io/json/authors.json");
  return res.json();
};
export default function Home() {
  const { data: posts, status } = useQuery("posts", fetchPosts);
  const { data: authors, status: loading } = useQuery("authors", fetchAuthors);

  const getAuthorProfile = (author_id: number) => {
    return authors.find((el) => el.id === author_id);
  };

  return (
    <div className="bg-gray-100 w-full flex">
      <div className="container max-w-5xl mx-auto py-8">
        <h1 className="font-bold text-2xl mb-8"> MAQE Forum</h1>
        <h5 className="text-sm text-gray-600">
          Your current timezone is :Asia/Bangkok
        </h5>
        <div className="flex flex-col mt-4">
          {status === "error" && <p>Error fetching data</p>}
          {status === "loading" && <p>Fetching data...</p>}
          {status === "success" && (
            <div>
              {posts.map((post, index) => (
                <div
                  className={`${
                    index % 2 == 1 ? "bg-blue-ocean" : "bg-white"
                  } shadow w-full border-b border-gray-200 mb-3`}
                  key={post.id}
                >
                  <div className="flex flex-row border-b border-gray-100 py-2 px-3 items-center">
                    <img
                      src={getAuthorProfile(post.author_id)["avatar_url"]}
                      className="h-6 w-6 rounded-full mr-1"
                    />
                    <span className="text-link text-xs font-semibold capitalize">
                      {getAuthorProfile(post.author_id)["name"]}
                    </span>
                    <span className="text-gray-400 text-xs capitalize ml-1">
                      posted on{" "}
                      {dayjs(post.created_at).format(
                        "dddd, MMMM D, YYYY h:mm "
                      )}
                    </span>
                  </div>
                  <div className="flex flex-row py-3 px-3">
                    <img
                      src={post.image_url}
                      className="w-100 h-40 object-cover"
                    />
                    <div className="flex flex-col ml-4">
                      <h1 className="font-semibold text-md mb-1 text-gray-600 leading-6">
                        {post.title}
                      </h1>
                      <h4 className="text-sm text-gray-600">{post.body}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
