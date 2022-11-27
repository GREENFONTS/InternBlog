import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import {GetImageUrl} from "../utils/UploadImage"

function CreatePost({ isAuth, setLoading }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if(image === "" || title === "" || content === ""){
      setButtonDisabled(true)
    }else{
      setButtonDisabled(false)
    }
  }, [title, content, image])

  const createPost = async () => {
    setLoading(true);
    let result = await GetImageUrl(image);

    if (result) {
      let image = result.url;
      await addDoc(postsCollectionRef, {
        title,
        image,
        content,
        created_at: new Date().getUTCDate(),
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      navigate("/");
    }
  };





  return (
    <div className="container my-8">
      <div className="flex justify-center items-center p-3 my-5">
        <h2 className="font-sans text-5xl">Create Post</h2>
      </div>
      <div className="block p-6 rounded-lg shadow-lg bg-white w-2/5 mx-auto my-8">
        <form>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <input
              className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="file"
              id="formFile"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group mb-6">
            <textarea
              className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
              id="exampleFormControlTextarea13"
              rows="6"
              placeholder="Enter blog content"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="
        w-full
        px-6
        py-2.5
        bg-gray-900
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-gray-700 hover:shadow-lg
        focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-gray-800 active:shadow-lg
        disabled:opacity-50
        transition
        duration-150
        ease-in-out"
            disabled={buttonDisabled}
            onClick={() => createPost()}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
