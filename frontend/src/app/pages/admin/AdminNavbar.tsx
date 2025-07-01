import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { logoutUser } from "../../redux/features/auth/AuthSlice/AuthSlice";

const AdminSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user) as { role?: string } | null;

  // Handle screen resize
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {open && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow z-50 transform transition-transform duration-300 ease-in-out
        ${open || !isMobile ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b">
          <img
            src="/ChatGPT Image May 23, 2025, 08_34_29 AM.png"
            className="w-10 mx-auto"
            alt="Logo"
          />
          <p className="text-center text-xl font-bold mt-2">WildTrail Gear</p>
        </div>

        <nav className="p-4 space-y-2 text-sm">
          <NavLink to="/admin" className="block hover:bg-gray-100 rounded px-3 py-2" onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/get-all_User" className="block hover:bg-gray-100 rounded px-3 py-2" onClick={() => setOpen(false)}>
            Get All User
          </NavLink>

          {/* Category Dropdown */}
          <details className="px-2">
            <summary className="cursor-pointer py-2 hover:bg-gray-100 rounded px-1">
              Category
            </summary>
            <div className="pl-4">
              <NavLink to="/admin/add-category" className="block hover:bg-gray-100 rounded px-3 py-1" onClick={() => setOpen(false)}>
                Add Category
              </NavLink>
              <NavLink to="/admin/get_all_categories" className="block hover:bg-gray-100 rounded px-3 py-1" onClick={() => setOpen(false)}>
                Get All Categories
              </NavLink>
            </div>
          </details>

          {/* Products Dropdown */}
          <details className="px-2">
            <summary className="cursor-pointer py-2 hover:bg-gray-100 rounded px-1">
              Products
            </summary>
            <div className="pl-4">
              <NavLink to="/admin/add-product" className="block hover:bg-gray-100 rounded px-3 py-1" onClick={() => setOpen(false)}>
                Add Product
              </NavLink>
              <NavLink to="/admin/get-all-products" className="block hover:bg-gray-100 rounded px-3 py-1" onClick={() => setOpen(false)}>
                Get All Products
              </NavLink>
            </div>
          </details>

          <div className="pt-6 border-t mt-4">
            {user?.role === "ADMIN" && (
              <button
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full rounded text-left"
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              >
                <MdOutlineAdminPanelSettings />
                Switch to User
              </button>
            )}

            <button
              className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 w-full rounded text-left mt-2"
              onClick={handleLogout}
            >
              <HiOutlineLogout />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
