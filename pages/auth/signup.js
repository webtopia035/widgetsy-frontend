import React, { useState, useContext } from "react";
import { config } from "../../utils/config";
import { useRouter } from "next/router";
import ContextData from "../../contexts/contextData";
import Link from "next/link";
import styles from "../../styles/Signup.module.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cred, setCred] = useState({});
  const dataCtx = useContext(ContextData);
  const router = useRouter();
  const authHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.url}/api/user/signup`, {
        method: "POSt",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cred.username,
          email: cred.email,
          password: cred.password,
        }),
      });

      const responseData = await response.json();
      dataCtx.setUserId(responseData.userId);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.auth} ${styles.signup_page}`}>
      <div className={styles.auth_container}>
        <div className={styles.image_container}></div>
        <div className={styles.signup_container}>
          <div className={styles.signup_content}>
            <div className={styles.header}>Create your account</div>
            <div className={styles.header_text}>Please enter your details.</div>
            <form className={styles.form_container} onSubmit={authHandler}>
              <label className={styles.labels} htmlFor="username">
                Username
              </label>
              <br />
              <input
                maxLength={20}
                required
                className={`${styles.username} ${styles.input}`}
                name="username"
                type="text"
                onChange={(e) => setCred({ ...cred, username: e.target.value })}
              />
              <p className={styles.username_rule}>
                Max. 20 characters are allowed!
              </p>

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

              <input
                className={styles.signup_btn}
                type="submit"
                value="signup"
              />
            </form>
            <div className={styles.or}>OR</div>
            <button className={styles.signup_google}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.google_logo}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                alt="google"
              />
              CONTINUE WITH GOOGLE
            </button>
            <p className={styles.login_text}>
              Already have an account?{" "}
              <span className={styles.login_btn}>
                <Link href="/auth/login">Log In!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
