import { Outlet } from "react-router";
import AdminNavbar from "../AdminNavbar";


const AdminLaout = () => {
    return (
        <div className="">
            <AdminNavbar/>
            <Outlet/>
        </div>
    );
};

export default AdminLaout;