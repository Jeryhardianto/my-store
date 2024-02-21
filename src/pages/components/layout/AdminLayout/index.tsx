import Sidebar from "../../fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptype = {
  children: React.ReactNode
}

const listSiderbarItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard"
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-package"
  }
]



const AdminLayout = (props: Proptype) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSiderbarItems} />
      {children}
    </div>
  );
}



export default AdminLayout