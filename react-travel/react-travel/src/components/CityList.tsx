import React from "react";

import styles from "./CityList.module.css";
import {TCity} from "../types.ts";
import Message from "./Message.tsx";
import {Link} from "react-router-dom";

interface IProps {
    cities: TCity[];
}

const CityList: React.FC<IProps> = ({cities}) => {

    if (cities.length === 0) {
        return <Message message={'Add your first by clicking on a city on the map'}></Message>
    }

    return <ul className={styles.cityList}>
        {cities.map(city => <li key={city.id}>
            <Link to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`} className={styles.cityItem}>
                <span className={styles.emoji}>{city.emoji}</span>
                <h3 className={styles.name}>{city.cityName}</h3>
                <time className={styles.date}>{city.date}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>)}
    </ul>
}

export default CityList;
