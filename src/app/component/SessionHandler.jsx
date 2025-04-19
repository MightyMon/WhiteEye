"use client";

import { useSession } from "next-auth/react";
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from "./SessionHandler.module.css";

const SessionHandler = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className={styles.container}>
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
      </div>
    );
  }

  return <>{children}</>;
};

export default SessionHandler;