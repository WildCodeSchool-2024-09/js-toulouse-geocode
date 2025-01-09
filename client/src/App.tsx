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
      <GeoPositionContextProvider>
        <StationsLocationsContextProvider>
          <main>
            <Outlet />
          </main>
          {showMenubar && <MenuBar />}
        </StationsLocationsContextProvider>
      </GeoPositionContextProvider>
    </>
  );
}

export default App;
