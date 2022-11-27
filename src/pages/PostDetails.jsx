import React, { useEffect, useState, useContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import LoaderComponent from "../components/Loader";
import { GlobalContext } from "../App";

const PostDetails = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(GlobalContext);
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const postsCollectionRef = collection(db, "posts");
    const getPost = async () => {
      const data = await getDocs(postsCollectionRef);
      const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const Post = posts.find((x) => x.id === id);
      if (Post === undefined) {
        alert("post doesn't exist");
        navigate("/");
      } else {
        setPost(Post);
      }
      setLoading(false);
    };

    getPost();
  }, [id, setLoading, navigate]);

  return (
    <>
      {loading || post === null ? (
        <LoaderComponent />
      ) : (
        <div className="bg-white shadow-lg w-5/6 mx-auto my-9 rounded-lg lg:p-8 pb-12 mb-8">
          <div className="relative overflow-hidden mb-6">
            <img
              src={post.image}
              alt=""
              className="object-top h-full w-full object-cover rounded-t-lg lg:rounded-lg"
            />
          </div>
          <div className="px-4 lg:px-0 py-5">
            <div className="flex items-center mb-8 w-full">
              <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
                <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                  {post.author.name}
                </p>
              </div>
              <div className="font-medium text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline mr-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="align-middle">{post.created_at}</span>
              </div>
            </div>
            <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
            <p>{post.content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
