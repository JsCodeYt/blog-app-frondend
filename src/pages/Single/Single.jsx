import SingleComponent from "../../components/SingleComponent/SingleComponent";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./single.css";
import { useLocation } from "react-router-dom";

export default function Single() {
  const lacation = useLocation();
  const path = location.pathname.split("/")[2];
  return (
    <div className="single">
      <SingleComponent path={path}/>
      <Sidebar />
    </div>
  );
}
