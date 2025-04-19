"use client"; // Mark as Client Component

import { useEffect } from 'react'; // Import useEffect
import { useSession } from 'next-auth/react'; // Import useSession
import { useRouter } from 'next/navigation'; // Import useRouter
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession(); // Use the useSession hook
    const router = useRouter(); // Use the useRouter hook

    // Redirect to login if unauthenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    // Show loading state while session is loading
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    // If authenticated, render the layout content
    if (status === 'authenticated') {
        return(
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Sidebar />
                </div>
                <div className={styles.content}>
                    <Navbar />
                    {children}
                </div>
            </div>
        );
    }

    // Fallback for other statuses (shouldn't be reached if redirect works)
    return <div>Access Denied</div>;
};

export default Layout;
