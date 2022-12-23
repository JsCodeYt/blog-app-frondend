import "./header.css";
import { header } from "../../links";

export default function Header() {
  return (
    <div className="header">
      <div className="header-titles">
        <span className="header-titlesm">React & Node</span>
        <span className="header-titlelg">Blog</span>
      </div>
      <img src={header} alt={header} />
    </div>
  );
}
