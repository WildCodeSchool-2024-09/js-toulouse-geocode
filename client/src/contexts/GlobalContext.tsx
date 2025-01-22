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
          <StationsLocationsContextProvider>
            {children}
          </StationsLocationsContextProvider>
        </ShowMenubarProvider>
      </GeoPositionContextProvider>
    </AuthProvider>
  );
}
