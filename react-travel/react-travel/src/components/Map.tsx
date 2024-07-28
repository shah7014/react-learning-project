import React from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import styles from "./Map.module.css";


const Map: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    const navigate = useNavigate();

    const goToFormHandler = () => {
        navigate('/app/form')
    }


    return <div className={styles.mapContainer} onClick={goToFormHandler}>
        <h1>Map</h1>
        <h1>{lat} {lng}</h1>
        <button onClick={() => {
            setSearchParams({lat: '23', lng: '40'})
        }}>Change Position</button>
    </div>
}

export default Map;
