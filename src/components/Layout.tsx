import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import GlobalScrollIndicator from "./GlobalScrollIndicator";

const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow pt-16 md:pt-20">
        <Outlet />
      </main>
      {location.pathname !== "/" && <Footer />}
      <GlobalScrollIndicator />
    </div>
  );
};

export default Layout;
