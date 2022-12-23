import Header from "../../components/Header/Header";
import "./home.css";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/post");
      setPosts(res.data);
    };
    getPost();
  }, []);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
