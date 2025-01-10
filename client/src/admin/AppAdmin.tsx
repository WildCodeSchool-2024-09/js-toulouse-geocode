import { Outlet } from "react-router-dom";
import NavAdmin from "./components/NavAdmin";

export default function AppAdmin() {
  return (
    <>
      <NavAdmin />
      <Outlet />
    </>
  );
}
