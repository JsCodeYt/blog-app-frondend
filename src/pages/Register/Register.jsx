import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useContext(Context);

  const handleClick = () => {
    const newUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username,
            email,
            password,
          }
        );
        window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.replace("/")
      } catch (err) {
        console.log(err);
      }
    };
    newUser();
    console.log(state);
  };

  return (
    <div className="register-container">
      <div className="register">
        <div className="login__form">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" onClick={handleClick}>
            Register
          </button>
        </div>
        <Link to="/login">
          <button className="register-login__button">Login</button>
        </Link>
      </div>
    </div>
  );
}
