import "./set.css";
import { posts } from "../../links";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Set() {
  const { state } = useContext(Context);
  const { user } = state;
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("ok");
    const updateUser = {
      username,
      email,
      password,
    };
    if (file) {
      try {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updateUser.profileImage = filename;

        try {
          await axios
            .post("http://localhost:5000/api/upload", data)
            .then((res) => {
              console.log("downlaod photo");
            });
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios
        .put(`http://localhost:5000/api/user/${user._id}`, {
          userId: user._id,
          ...updateUser,
        })
        .then((res) => {
          window.localStorage.setItem("user", JSON.stringify(res.data));
          window.location.replace("/");
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="set">
      <span className="set-title">Upload your accaunt !</span>
      <div className="set-pp">
        <form className="set-pp__form">
          <label htmlFor="file__input">
            <i className="file__icon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="file__input"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" onClick={handleClick}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
