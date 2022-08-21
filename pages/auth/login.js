import React from "react";
import Link from "next/link";
import styles from "../../styles/Login.module.css";

const login = () => {
  return (
    <div className={`${styles.auth} ${styles.login_page}`}>
      <div className={styles.auth_container}>
        <div className={styles.image_container}></div>
        <div className={styles.login_container}>
          <div className={styles.login_content}>
            <div className={styles.header}>Welcome back!</div>
            <div className={styles.header_text}>Please enter your details.</div>
            <form className={styles.form_container}>
              <label className={styles.labels} htmlFor="email">
                Email address
              </label>
              <br />
              <input
                className={`${styles.email} ${styles.input}`}
                name="email"
                type="email"
              />
              <br />
              <label className={styles.labels} htmlFor="password">
                Password
              </label>
              <br />
              <input
                className={`${styles.password} ${styles.input}`}
                name="password"
                type="password"
              />
              <br />
              <input className={styles.login_btn} type="submit" value="Login" />
            </form>
            <div className={styles.or}>OR</div>
            <button className={styles.login_google}>
              <img
                className={styles.google_logo}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                alt="google"
              />
              LOGIN WITH GOOGLE
            </button>
            <p className={styles.signup_text}>
              Don't have an account?{" "}
              <span className={styles.signup_btn}>
                <Link href="/auth/signup">Sign Up!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
