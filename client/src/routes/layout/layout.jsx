import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Layout() {
  return (
    <div className="h-screen max-w-[1366px] mx-auto px-5 flex flex-col max-lg:max-w-[1280px] max-md:max-w-[768px] max-sm:max-w-[640px]">
  <div className="navbar">
    <Navbar />
  </div>
  <div className="content h-[calc(100vh-100px)]">
    <Outlet />
  </div>
</div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="h-screen max-w-[1366px] max-lg:max-w-[1280px] max-md:max-w-[768px] max-sm:max-w-[640px] mx-auto px-5 flex flex-col">
  <div className="navbar">
    <Navbar />
  </div>
  <div className="content h-[calc(100vh-100px)]">
    <Outlet />
  </div>
</div>
    );
  }
}

export { Layout, RequireAuth };
