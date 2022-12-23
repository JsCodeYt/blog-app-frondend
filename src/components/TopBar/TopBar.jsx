import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./topbar.css";
import { Link } from "react-router-dom";

export default function TopBar() {
  const { state } = useContext(Context);
  const [list, setList] = useState(false);
  const { user } = state;
  const PF = "http://localhost:5000/upload";

  const handleOut = () => {
    window.localStorage.clear();
  };
  return (
    <div className="top">
      <div className="top-left">
        <i className="left__icon fa-brands fa-square-instagram"></i>
        <i className="left__icon fa-brands fa-square-youtube"></i>
        <i className="left__icon fa-brands fa-square-twitter"></i>
        <i className="left__icon fa-brands fa-square-facebook"></i>
      </div>
      <div className="top-center">
        <ul className="top-center__items">
          <a href="/" className="top-center__item">
            Home
          </a>
          <a href="/" className="top-center__item">
            About
          </a>
          <a href="/" className="top-center__item">
            Contact
          </a>
          <a href="/write" className="top-center__item">
            Write
          </a>
          <a href="/" className="top-center__item" onClick={handleOut}>
            LogOut
          </a>
        </ul>
      </div>
      <div className="top-rigth">
        {user?.profileImage ? (
          <Link to="/set">
            <img src={`${PF}/${user.profileImage}`} alt={user.profileImage} />
          </Link>
        ) : (
          <Link to="/set">
            <i className="fa-solid fa-user"></i>
          </Link>
        )}
        <i
          className="fa-solid fa-bars menu-icon"
          onClick={(e) => {
            setList((prev) => !prev);
          }}
        ></i>
        {list ? (
          <div className="list-navbar">
            <ul className="list__items">
              <i
                className="fa-solid fa-bars menu-icon"
                onClick={(e) => {
                  setList((prev) => !prev);
                }}
              ></i>

              <Link to="/" className="list__item">Home</Link>
              <Link to="/write" className="list__item">Write</Link>
              <Link to="/set" className="list__item">Settings</Link>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
