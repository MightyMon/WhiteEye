'use client'
import styles from "./navbar.module.css"
import { usePathname } from "next/navigation"
import 'primeicons/primeicons.css';


const Navbar = () => {
    const pathname = usePathname();

    return(
        <div className={styles.containerwrap}>
        <div className={styles.container}>
            <div className={styles.title}>
                {pathname.split("/").pop()}
            </div>
            <div className={styles.menu}>
                <div className={styles.search}>
                <i className="pi pi-search"></i>
                <input type="text" placeholder="Search..." className={styles.input} />
                </div>
                <div>

                </div>
            </div>
        </div>
        </div>
    )
}

export default Navbar