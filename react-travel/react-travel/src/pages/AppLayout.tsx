import React from "react";

import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar.tsx";
import Map from "../components/Map.tsx";
import User from "../components/User.tsx";

const AppLayout: React.FC = () => {
    return <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
    </div>
}

export default AppLayout;

