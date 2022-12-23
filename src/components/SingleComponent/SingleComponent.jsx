import "./SingleComponent.css";
import { posts } from "../../links";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

export default function SingleComponent({ path }) {
  const [post, setPost] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const PF = "http://localhost:5000/upload";
  const { state } = useContext(Context);
  useEffect(() => {
    console.log(path);
    const getPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/post/${path}`);
      setPost(res.data);
    };
    getPost();
  }, [path]);
  const handleDelete = () => {
    const deletePost = async () => {
      await axios
        .delete(`http://localhost:5000/api/post/${path}`, {
          data: {
            username: state.user.username,
          },
        })
        .then((res) => {
          window.location.replace("/");
        })
        .catch((err) => {
          console.log(err + "err");
        });
    };
    deletePost();
  };
  const handleUpdate = () => {
    setShowUpdate(true);
  };
  const handleUpdataPost = async (event) => {
    event.preventDefault();
    const updatePost = {
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      try {
        const saveImg = async () => {
          const res = await axios.post(
            "http://localhost:5000/api/upload",
            data
          );
          console.log(res.data);
        };
        saveImg();
        updatePost.image = filename;
      } catch (err) {}
    }
    try {
      const res = await axios
        .put(`http://localhost:5000/api/post/${path}`, {
          ...updatePost,
          username: post.username,
        })
        .then((res) => {
          window.location.replace("/");
        });
    } catch (err) {
      console.log(err);
      console.log("not upload");
    }
  };
  return (
    <div className="single__component">
      {post.image && <img src={`${PF}/${post.image}`} alt={post.image} />}
      {showUpdate ? (
        <div className="show-update">
          <div className="show-update__form__container">
            <form className="show-update__form">
              <div className="update-form__img">
                <label htmlFor="file__input">
                  <i className="file__icon fa-solid fa-plus"></i>
                </label>
                <input
                  type="file"
                  id="file__input"
                  style={{ display: "none" }}
                  name="file__input"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>
              <input
                className="form__title"
                type="text"
                placeholder="enter your title !"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <input
                className="form__desc"
                placeholder="enter your description"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              <button onClick={handleUpdataPost}>Updata</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="single-info">
          <div className="single-title">
            <span>{post.title}</span>
            {state.user.username === post.username && (
              <div className="sigle__icons">
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={handleUpdate}
                ></i>
                <i className="fa-solid fa-trash" onClick={handleDelete}></i>
              </div>
            )}
          </div>
          <span className="singe-date__titles">
            <span className="single-author">{post.username}</span>
            <span>{new Date(post.createdAt).toDateString()}</span>
          </span>
          <p className="single-desc">{post.desc}</p>
        </div>
      )}
    </div>
  );
}
