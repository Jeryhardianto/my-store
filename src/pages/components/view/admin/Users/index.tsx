import AdminLayout from "@/pages/components/layout/AdminLayout";
import Button from "@/pages/components/ui/button";
import styles from "./Users.module.scss";
import { useEffect, useState } from "react";

import ModalDeleteUser from "./ModalDeleteUser";
import ModalUpdateUser from "./ModalUpdateUser";

type PropsTypes = {
  users: any;
};
const UsersAdminView = (props: PropsTypes) => {
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const { users } = props;
  const [usersData, setUsersData] = useState<any>([]);
  const [deletedUser, setDeleteUser] = useState<any>([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1>User Manegement</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: any, index: number) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button
                        type="button"
                        onClick={() => setUpdatedUser(user)}
                        className={styles.users__table__action__edit}
                      >
                        {" "}
                        <i className="bx bx-edit" />
                      </Button>
                      <Button 
                      type="button"
                      className={styles.users__table__action__delete}
                      onClick={() => {
                        setDeleteUser(user);
                      }}
                      >
                        {" "}
                        <i className="bx bx-trash" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
       {Object.keys(deletedUser).length && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeleteUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};

export default UsersAdminView;
