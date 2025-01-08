import { Outlet } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import { useShowMenubar } from "./context/ShowMenubarProvider";

function App() {
  const { showMenubar } = useShowMenubar();

  return (
    <>
      <main>
        <Outlet />
      </main>
      {showMenubar && <MenuBar />}
    </>
  );
}

export default App;
