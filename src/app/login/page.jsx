"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!username.trim()) {
      formErrors.username = "Username is required";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setErrors({ general: result.error });
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginpage}>
        <div className={styles.loginbox}>
          <h2 className={styles.heading123}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputbox}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className={styles.error}>{errors.username}</p>
              )}
            </div>
            <div className={styles.inputbox}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>
            <div className={styles.buttonbox}>
              <button type="submit">Sign In</button>
            </div>
            {errors.general && <p className={styles.error}>{errors.general}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
