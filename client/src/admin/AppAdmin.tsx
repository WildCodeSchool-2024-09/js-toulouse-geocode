import { Outlet } from "react-router-dom";
import NavAdmin from "./components/NavAdmin";
import { useShowNav } from "./contexts/ShowNavProvider";
import "./AppAdmin.css";

export default function AppAdmin() {
  const { navVisible } = useShowNav();

  return (
    <div className="app-admin">
      {navVisible && <NavAdmin />}
      <Outlet />
    </div>
  );
}
