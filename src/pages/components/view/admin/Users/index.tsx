import AdminLayout from "@/pages/components/layout/AdminLayout";
import Button from "@/pages/components/ui/button";
import styles from "./Users.module.scss";

type PropsTypes = {
  users: any;
};
const UsersAdminView = (props: PropsTypes) => {
  const { users } = props;
 
  return (
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
            {users.map((user: any, index: number) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td> 
                <td>{user.role}</td>
                <td>
                  <div className={styles.users__table__action}>
                    <Button type="button"> Edit</Button>
                    <Button type="button"> Hapus</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UsersAdminView;
