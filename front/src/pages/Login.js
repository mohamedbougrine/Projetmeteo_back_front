import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Login successful");
        navigate("/home");
      } else {
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className={`${styles.login} ${styles.fullScreen}`}>
      <div className={styles.login1}>
        <img className={styles.vectorsIcon} alt="" src="/vectors@2x.png" />
        <img
          className={styles.lightModeDarkMode}
          alt=""
          src="/light-mode--dark-mode@2x.png"
        />
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className={styles.loginBtn}>
            <button type="submit" className={styles.rectangle} />
            <div className={styles.login2}>login</div>
          </div>
          <input
            className={styles.password}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            className={styles.email}
            placeholder="Email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className={styles.metheoSite}>Metheo Site</div>
          <div className={styles.signIn}>Sign in</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
