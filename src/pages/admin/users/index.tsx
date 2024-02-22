import UsersAdminView from "@/pages/components/view/admin/Users"
import { use, useEffect, useState } from "react";
import userServices from "@/services/user";

const AdminUsersPage = () => {
 const [users, setUsers] = useState([]);
 useEffect(() => {
   const getAllUsers = async () => {
     const { data } = await userServices.getAllUsers();
     setUsers(data.data);
   };
   getAllUsers();
 }, []);
 return (
  <>
   <UsersAdminView users={users} />
  </>
 )
}

export default AdminUsersPage