import axios from "axios";
import { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const { state, dispatch } = useContext(Context);
  const userRef = useRef();
  const passwordRef = useRef();
  const handleClick = async () => {
    dispatch({ type: "USER_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "USER_OK", payload: res.data });
      window.localStorage.setItem("user", JSON.stringify(res.data));
      window.location.replace("/")
    } catch (err) {
      dispatch({ type: "USER_ERROR" });
    }
  };
  return (
    <div className="login-container">
      <div className="login">
        <div className="login__form">
          <input type="text" placeholder="username" ref={userRef} />
          <input type="password" placeholder="password" ref={passwordRef} />
          <button onClick={handleClick}>Login</button>
        </div>
        <Link to="/register">
          <button className="login-register__button">Register</button>
        </Link>
      </div>
    </div>
  );
}
