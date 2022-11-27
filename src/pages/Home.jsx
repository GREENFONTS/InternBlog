import React, { useContext, useEffect, useState } from "react";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import PostCard from "../components/Posts";
import LoaderComponent from "../components/Loader";
import { GlobalContext } from "../App";

const Home = () => {
  const { loading, setLoading } = useContext(GlobalContext);
  const [postLists, setPostList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const postsCollectionRef = collection(db, "posts");
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getPosts();
  }, [setLoading]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    
    setPostList(postLists.filter(x => x.id !== id))
  };

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
        <div className="container my-8">
          <div className="flex justify-center items-center my-5">
            <h2 className="font-sans text-5xl text-center">Blog Posts</h2>
          </div>

          <>
            {postLists.length < 1 ? (
              <div className="w-full h-90 flex justify-center items-center">
                <div className="w-2/3 mx-auto shadow my-5 h-[300px] flex justify-center items-center">
                  <h1 className="text-2xl text-center">No Posts available <br />😥😥😥</h1>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:px-9 mx-5">
                {postLists.map((post) => {
                  return <PostCard post={post} key={post.id} deletePost={deletePost}/>;
                })}
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default Home;
