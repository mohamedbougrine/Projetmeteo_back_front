import React, { useState } from "react";
import styles from "./SIGNUP.module.css";

const SIGNUP = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email: emailValue, password: passwordValue }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Account created successfully!');
        setErrorMessage('');
      } else {
        setErrorMessage(`Signup failed: ${data.error}`);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage(`Error during signup: ${error}`);
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.signUp}>
      <div className={styles.signUp1}>
        <div className={styles.form}>
          <button className={styles.loginBtn} onClick={handleSignup}>
            <button className={styles.rectangle} />
            <div className={styles.creerAccount}>Create Account</div>
          </button>
          <input
            className={styles.password}
            placeholder="Password"
            type="password"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
          />
          <input
            className={styles.email}
            placeholder="Email"
            type="text"
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
          />
          <div className={styles.successMessage}>{successMessage}</div>
          <div className={styles.errorMessage}>{errorMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default SIGNUP;
