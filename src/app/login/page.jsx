'use client'
import React, { useState, useEffect } from "react";
import styles from "./Login.module.css"; // Import CSS modules

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleSubmit = (e) => {
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
      // **HARDCODED CREDENTIALS **
      console.log("Login successful! (Hardcoded credentials)");
      console.log(typeof(username));
      console.log(password)
      if (username === 'admin' && password === '1234678') {
        console.log("Login successful! (Hardcoded credentials)");
        window.location.href = "https://google.com"; 
      } else {
       
        window.location.href = "/dashboard";
      }
      
    }
  };

  return (
    <div className={styles.container}>
      <div className="meteor-1"></div>
      {/* ... other meteor animations (optional) */}
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
              {errors.username && <p className={styles.error}>{errors.username}</p>}
            </div>
            <div className={styles.inputbox}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>
            <div className={styles.buttonbox}>
              <button>Sign In</button>
            </div>
            {errors.general && <p className={styles.error}>{errors.general}</p>}
          </form>
          {isLoggedIn && <p className={styles.success}>Login successful!</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
