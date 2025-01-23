import ShowNavProvider from "../admin/contexts/ShowNavProvider";
import AuthProvider from "./AuthProvider";
import { GeoPositionContextProvider } from "./GeoPositionContextProvider";
import { ShowMenubarProvider } from "./ShowMenubarProvider";
import { StationsLocationsContextProvider } from "./StationsLocationsContextProvider";

export default function GlobalContext({
  children,
}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <GeoPositionContextProvider>
        <ShowMenubarProvider>
          <ShowNavProvider>
            <StationsLocationsContextProvider>
              {children}
            </StationsLocationsContextProvider>
          </ShowNavProvider>
        </ShowMenubarProvider>
      </GeoPositionContextProvider>
    </AuthProvider>
  );
}
