
import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminNavbar";


const AdminLaout = () => {
    return (
        <>
     <div className="min-h-screen flex">
      {/* Sidebar (always visible on desktop) */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 p-4 bg-gray-50">
        <Outlet />
      </div>
    </div>
       </>
    );
};

export default AdminLaout;