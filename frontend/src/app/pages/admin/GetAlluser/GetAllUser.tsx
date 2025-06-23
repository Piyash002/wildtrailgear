/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDeleteUserMutation, useGetAllUserQuery, useUpdateUserRoleMutation } from "../../../redux/features/auth/authApi/authApi";
import type { Tuser } from "../../../types/types";

const GetAllUser = () => {
  const { data: response } = useGetAllUserQuery(null);
    const userdata = response?.data ?? [];
     const length = userdata.length;
    const [selectedUser, setSelectedUser] = useState<Tuser | null>(null);
  const [role, setRole] = useState("USER");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update_user_role] = useUpdateUserRoleMutation()
  const [deleteUser] = useDeleteUserMutation()


    const handleEdit = (user:any) => {
    setSelectedUser(user);
    setRole(user.role);
    setIsModalOpen(true);
  };
  const handleDelete = async (userId:any) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser({id:userId});
    }
  };
  const handleUpdateRole = async () => {
    if (!selectedUser) return;
   const data =  await update_user_role({ id: selectedUser._id, role });
   console.log(data)
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Total Users: {length}</h1>

      {userdata.map((data: Tuser) => (
        <div
          key={data._id}
          className="min-w-full border border-gray-200 rounded-md shadow-md p-4 mb-4"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-x-4 items-center">
              <div>
                <img
                  className="w-12 h-12 rounded-full object-cover border"
                  src={data?.profileImage || "/default-avatar.png"}
                  alt={data.name}
                />
              </div>

              <ul className="text-sm font-body space-y-1">
                <li><>Name:</> {data.name}</li>
                <li><>Email:</> {data.email}</li>
                <li>
                  <>Role:</>{" "}
                  {data.role === "ADMIN" ? (
                    <span className="bg-green-500 text-white rounded px-2 py-0.5">{data.role}</span>
                  ) : (
                    <span className="bg-gray-200 px-2 py-0.5 rounded">{data.role}</span>
                  )}
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-center">
              <div tabIndex={0} role="button" className="btn btn-sm">
                Actions ⬇️
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
              >
                <li><button onClick={()=>handleEdit(data)}>Edit</button></li>
                <li><button onClick={()=>handleDelete(data._id)}>Delete</button></li>
              </ul>
            </div>
            {
              isModalOpen&& (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-md min-w-[300px]">
            <h2 className="text-lg font-semibold mb-4">Update Role</h2>
            <p>User: <strong>{selectedUser?.name}</strong></p>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded w-full my-3"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
              <button onClick={handleUpdateRole} className="bg-green-500 text-white px-3 py-1 rounded">Update</button>
            </div>
          </div>
        </div>
      )
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetAllUser;
