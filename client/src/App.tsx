import { Outlet } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import { GeoPositionContextProvider } from "./contexts/GeoPositionContextProvider";

function App() {
  return (
    <>
      <GeoPositionContextProvider>
        <main>
          <Outlet />
        </main>
        <MenuBar />
      </GeoPositionContextProvider>
    </>
  );
}

export default App;
