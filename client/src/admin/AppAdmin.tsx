import { Outlet } from "react-router-dom";
import NavAdmin from "./components/NavAdmin";
import { useShowNav } from "./contexts/ShowNavProvider";

export default function AppAdmin() {
  const { navVisible } = useShowNav();

  return (
    <>
      {navVisible && <NavAdmin />}
      <Outlet />
    </>
  );
}
