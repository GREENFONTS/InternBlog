import React from "react";
import { auth, db } from "../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";

const PostCard = ({ post, isAuth }) => {
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  
  return (
    <div className="w-full flex flex-col gap-y-9 h-[350px] mx-auto shadow p-3">
      <div className="h-1/2 container">
        <img h="inherit" w="inherit" src={post.image} alt="post" />
      </div>
      <div className="h-1/2 py-8 px-2">
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
          <p className="text-sm font-light font-sans truncate">
            {post.content}
          </p>
          <h3 className="text-xs font-light font-sans truncate">
            Author : @{post.author.name}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
