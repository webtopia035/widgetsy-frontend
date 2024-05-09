import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { config } from "../../utils/config";
import { useRouter } from "next/router";
import ContextData from "../../contexts/contextData";
import styles from "../../styles/login.module.css";
import illustration from "../../public/assets/illustration.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cred, setCred] = useState({});
  const dataCtx = useContext(ContextData);
  const router = useRouter();

  const authHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            email: cred.email,
            password: cred.password,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        ),
      });

      if (!response.ok) {
        throw new Error(response.message);
      }

      const { token, userId } = await response.json();

      if (userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        dataCtx.setUserId(userId);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`${styles.auth} ${styles.login_page}`}>
      <div className={styles.auth_container}>
        <div className={styles.image_container}>
          <Image
            src={illustration}
            alt="illustration"
            className={styles.image}
          />
        </div>
        <div className={styles.login_container}>
          <div className={styles.login_content}>
            <div className={styles.header}>Welcome back!</div>
            <div className={styles.header_text}>Please enter your details.</div>
            <form className={styles.form_container} onSubmit={authHandler}>
              <label className={styles.labels} htmlFor="email">
                Email address
              </label>
              <br />
              <input
                required
                className={`${styles.email} ${styles.input}`}
                name="email"
                type="email"
                onChange={(e) => setCred({ ...cred, email: e.target.value })}
              />
              <br />
              <label className={styles.labels} htmlFor="password">
                Password
              </label>
              <br />
              <div className={styles.password_container}>
                <input
                  required
                  className={`${styles.password} ${styles.input}`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setCred({ ...cred, password: e.target.value })
                  }
                />
                {!showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`${styles.show} bi bi-eye`}
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`${styles.show} bi bi-eye-slash`}
                  ></i>
                )}
              </div>

              <input className={styles.login_btn} type="submit" value="Login" />
            </form>

            <p className={styles.signup_text}>
              Don&apos;t have an account?{" "}
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

export default Login;
