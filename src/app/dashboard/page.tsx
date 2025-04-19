"use client";

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from "../ui/dashboard/dashboard.module.css";
import Card from "../ui/dashboard/card/card";
import Recent from "../ui/dashboard/recent/recent";
import Chart from "../ui/dashboard/chart/chart";
import Status from "../ui/dashboard/status/status";

const DashBoard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

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

    // If authenticated, render the dashboard content
    if (status === 'authenticated') {
        return(
            <>
            {/* the div for meteor rain and the stars  */}
            <div className="star"></div>
            <div className="meteor-1"></div>
            <div className="meteor-2"></div>
            <div className="meteor-3"></div>
            <div className="meteor-5"></div>
            <div className="meteor-4"></div>
            <div className="meteor-6"></div>
            <div className="meteor-7"></div>
            <div className="meteor-8"></div>
            <div className="meteor-9"></div>
            <div className="meteor-10"></div>
            <div className="meteor-11"></div>
            <div className="meteor-12"></div>
            <div className="meteor-13"></div>
            <div className="meteor-14"></div>
            <div className="meteor-15"></div>

            <div className={styles.wrapper}>
              <div className={styles.main}>
                {/* Temporarily display session info */}
                <div>
                  <h2>Session Info</h2>
                  <p>Status: {status}</p>
                  {session && (
                    <div>
                      <p>User Email: {session.user.email}</p>
                      <p>User Role: {session.user.role}</p>
                    </div>
                  )}
                </div>
                {/* End temporary session info */}

                {/* Logout Button */}
                <button onClick={() => signOut()}>Logout</button>
                {/* End Logout Button */}

                <div className={styles.cards}>
                  <Card/>
                  <Card/>
                  <Card/>
                </div>
                <Recent/>
                <Chart/>
              </div>
              <div className={styles.side}>
                <Status />
              </div>
            </div>

            </>
        );
    }

    // Fallback for other statuses (shouldn't be reached if redirect works)
    return <div>Access Denied</div>;
};

export default DashBoard;
