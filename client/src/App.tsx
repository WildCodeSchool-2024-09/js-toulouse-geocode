import { Outlet } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <MenuBar />
    </>
  );
}

export default App;
