import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../images/logo.png";
import {Link, Outlet} from "react-router-dom";
import AppNav from "./AppNav.tsx";

const Sidebar: React.FC = () => {
    return <div className={styles.sidebar}>
        <Link to={"/"}>
            <img src={logo} alt={'worldwidelogo'} className={styles.logo}/>
        </Link>

        <AppNav />

        <Outlet />

        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
            </p>
        </footer>
    </div>
}

export default Sidebar;

