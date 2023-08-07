import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./homeNav.module.css";
import logo from "../../public/assets/Logo.png";

const HomeNav = () => {
  const router = useRouter();

  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    router.push("/auth/login");
  };
  return (
    <div className={styles.intro}>
      <nav className={styles.navbar}>
        <div className={styles.title}>
          <Link href="/">
            <Image src={logo} alt="logo" height={40} width={200} />
          </Link>
        </div>

        <div className={styles.link}>
          <ul>
            <li>
              <a href="https://widgetesy-docs.vercel.app/">
                Doss <i className="bi bi-box-arrow-up-right" />
              </a>
            </li>
            <li className={styles.navLink}>
              <a>Help</a>
              <div className={styles.dropdown}>
                <ul>
                  <li className={styles.dropdownLink}>
                    <a href="https://widgetesy-docs.vercel.app/">
                      <i className="bi bi-file-earmark-text"></i> Docs{" "}
                    </a>
                  </li>
                  <li className={styles.dropdownLink}>
                    <a href="#">
                      <i className="bi bi-discord"></i> Discord
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div onClick={logOut} className={styles.btn}>
                Log out
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HomeNav;
