import { Outlet } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import { GeoPositionContextProvider } from "./contexts/GeoPositionContextProvider";
import { ShowMenubarProvider } from "./contexts/ShowMenubarProvider";
import { StationsLocationsContextProvider } from "./contexts/StationsLocationsContextProvider";

function App() {
  return (
    <>
      <GeoPositionContextProvider>
        <StationsLocationsContextProvider>
          <ShowMenubarProvider>
            <main>
              <Outlet />
            </main>
            <MenuBar />
          </ShowMenubarProvider>
        </StationsLocationsContextProvider>
      </GeoPositionContextProvider>
    </>
  );
}

export default App;
