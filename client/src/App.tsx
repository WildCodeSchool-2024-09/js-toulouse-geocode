import { Outlet } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import { GeoPositionContextProvider } from "./contexts/GeoPositionContextProvider";
import { useShowMenubar } from "./contexts/ShowMenubarProvider";

function App() {
  const { showMenubar } = useShowMenubar();

  return (
    <>
      <GeoPositionContextProvider>
        <main>
          <Outlet />
        </main>
        {showMenubar && <MenuBar />}
      </GeoPositionContextProvider>
    </>
  );
}

export default App;
