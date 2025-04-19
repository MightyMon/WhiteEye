'use client'
import styles from "./navbar.module.css"
import { usePathname } from "next/navigation"
import 'primeicons/primeicons.css';

import { useState, useEffect } from 'react';

const Navbar = () => {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');

    return(
        <div className={styles.containerwrap}>
        <div className={styles.container}>
            <div className={styles.title}>
                {pathname.split("/").pop()}
            </div>
            <div className={styles.menu}>
                <div className={styles.search}>
                <i className="pi pi-search"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  className={styles.input}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                </div>
                <div>

                </div>
            </div>
        </div>
        </div>
    )
}

export default Navbar