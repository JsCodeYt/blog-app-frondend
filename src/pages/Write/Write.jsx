import "./write.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { state } = useContext(Context);
  const { user } = state;

  const handleSubmit = () => {
    e.preventDefault();
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      if (file.type === "video/mp4") {
        return false;
      } else {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.image = filename;
        try {
          await axios.post("http://localhost:5000/api/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
    }
    try {
      const res = await axios.post("http://localhost:5000/api/post", newPost);
      console.log(res);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="write">
      <div className="write__form-container">
        <form className="write__form" onSubmit={handleSubmit}>
          <label htmlFor="file__input">
            <i className="file__icon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="file__input"
            className="file__input"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="enter post title !"
            autoFocus={true}
            className="title__input"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="write__desc">
            <textarea
              placeholder="enter post description"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          </div>
          <button type="submit" onClick={handleClick}>
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}
