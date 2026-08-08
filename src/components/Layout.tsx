import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import GlobalScrollIndicator from "./GlobalScrollIndicator";
import SpotifyPlayer from "./SpotifyPlayer";

const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow pt-16 md:pt-20 flex flex-col">
        <div className="flex-grow flex flex-col w-full" style={{ zoom: '85%' }}>
          <Outlet />
          {location.pathname !== "/" && <Footer />}
        </div>
      </main>
      <GlobalScrollIndicator />
      <SpotifyPlayer />
    </div>
  );
};

export default Layout;
