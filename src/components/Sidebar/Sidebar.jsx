import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__items">
        <div className="sidebar__item">
          <i class="fa-solid fa-music"></i>
          <span>Music</span>
        </div>
        <div className="sidebar__item">
          <i class="fa-solid fa-medal"></i>
          <span>Sport</span>
        </div>
      </div>
    </div>
  );
}
