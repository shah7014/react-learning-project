import React from "react";
import {Link, NavLink} from "react-router-dom";

import styles from "./Navbar.module.css";
import logo from "../images/logo.png";

const Navbar: React.FC = () => {
    return <nav className={styles.navbar}>


        <Link to={"/"}>
            <img src={logo} alt={'worldwidelogo'} className={styles.logo}/>
        </Link>

        <ul>
            <li>
                <NavLink to={"/pricing"}>Pricing</NavLink>
            </li>
            <li>
                <NavLink to={"/product"}>Product</NavLink>
            </li>
            <li>
                <NavLink to={'/login'} className={'cta'}>Login</NavLink>
            </li>
        </ul>
    </nav>
}

export default Navbar;

