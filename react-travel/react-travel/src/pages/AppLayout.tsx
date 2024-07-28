import React from "react";

import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar.tsx";
import Map from "../components/Map.tsx";

const AppLayout: React.FC = () => {
    return <div className={styles.app}>
        <Sidebar />
        <Map />
    </div>
}

export default AppLayout;

