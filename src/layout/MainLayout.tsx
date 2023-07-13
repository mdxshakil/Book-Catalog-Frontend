import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
