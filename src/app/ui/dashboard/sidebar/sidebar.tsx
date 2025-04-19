"use client";
import styles from "./sidebar.module.css";
import "primeicons/primeicons.css";
import MenuLink from "./menuLink/menuLink";
import { FaTerminal, FaNetworkWired } from "react-icons/fa";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import Image from "next/image";
const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "IP",
        path: "/dashboard/IP",
        icon: <MdAnalytics />,
      },
      {
        title: "Hash Converter",
        path: "/dashboard/HashConverter",
        icon: <MdAnalytics />,
      },
      {
        title: "Hash Search",
        path: "/dashboard/HashSearch",
        icon: <FaTerminal />,
      },
      {
        title: "File Search",
        path: "/dashboard/FileSearch",
        icon: <FaNetworkWired />,
      },
    ],
  },
];

const Sidebar = () => {
  const handleLogout = () => {
    window.location.replace("http://localhost:3000/login");
  };
  return (
    <div>
      <div className="star"></div>

      {/* tbd- add styling for this div  */}
      <div className={styles.container}>
        <div className={styles.user}>
          <Image
            className={styles.userImage}
            src="/eye1.svg"
            alt=""
            width="50"
            height="50"
          />

          <div className={styles.userDetails}>
            <span className={styles.username}> White Eye</span>
            <span className={styles.userTitle}>Admin</span>
          </div>
        </div>
        <ul className={styles.list}>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className={styles.cat}>{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </li>
          ))}
        </ul>

        <button className={styles.logout}>
          <i className="pi pi-sign-out" onClick={handleLogout}></i>Go out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
