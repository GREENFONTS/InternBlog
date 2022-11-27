import React, { useContext } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

const PostCard = ({ post, deletePost }) => {
  const { isAuth} = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-y-9 h-[350px] mx-auto shadow p-3">
      <div className="h-1/2 w-full container flex justify-center items-center">
        <img className="w-full h-full" src={post.image} alt="post" />
      </div>
      <div className="flex flex-col gap-y-1 px-2">
        <div className="flex justify-between items-center">
          <h1 className="font-sans font-medium subpixel-antialiased text-lg truncate">
            {post.title}
          </h1>
          <div className="text-3xl hover:cursor-pointer">
            {isAuth && post.author.id === auth.currentUser.uid && (
              <button
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                &#128465;
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm  font-light font-sans truncate">
            {post.content}
          </p>
          <h3 className="text-xs font-light font-sans truncate">
            Author : @{post.author.name}
          </h3>

          <h3
            className="text-xs text-blue-700 underline decoration-solid font-medium font-sans truncate"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            Read more
          </h3>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
