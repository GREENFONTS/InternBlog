import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import PostCard from "../components/Posts";
import LoaderComponent from "../components/Loader";

function Home({ isAuth, loading, setLoading }) {
  const [postLists, setPostList] = useState([]);

  useEffect(() => {
    setLoading(true)
    const postsCollectionRef = collection(db, "posts");
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
        <div className="container my-8">
          <div className="flex justify-center items-center my-5">
            <h2 className="font-sans text-5xl text-center">Blog Posts</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:px-9 mx-5">
            {postLists.map((post) => {
              return <PostCard post={post} key={post.id} isAuth={isAuth} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
