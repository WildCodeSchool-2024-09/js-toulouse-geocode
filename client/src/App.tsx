import { Outlet } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import { GeoPositionContextProvider } from "./contexts/GeoPositionContextProvider";
import { useShowMenubar } from "./contexts/ShowMenubarProvider";
import { StationsLocationsContextProvider } from "./contexts/StationsLocationsContextProvider";

function App() {
  const { showMenubar } = useShowMenubar();

  return (
    <>
      <StationsLocationsContextProvider>
        <GeoPositionContextProvider>
          <main>
            <Outlet />
          </main>
          {showMenubar && <MenuBar />}
        </GeoPositionContextProvider>
      </StationsLocationsContextProvider>
    </>
  );
}

export default App;
