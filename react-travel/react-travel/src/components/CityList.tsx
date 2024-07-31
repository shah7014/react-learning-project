import React from "react";

import styles from "./CityList.module.css";
import Message from "./Message.tsx";
import {Link} from "react-router-dom";
import {useCitiesContext} from "../context/CitiesContext.tsx";

const CityList: React.FC = () => {

    const {cities, currentCity, deleteCity} = useCitiesContext();

    if (cities.length === 0) {
        return <Message message={'Add your first by clicking on a city on the map'}></Message>
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, cityId: string | number)  => {
        e.preventDefault();
        deleteCity(cityId);
    }

    return <ul className={styles.cityList}>
        {cities.map(city => <li key={city.id}>
            <Link to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
                  className={`${styles.cityItem} ${currentCity ? (currentCity.id === city.id ? styles['cityItem--active'] : '') : ''}`}>
                <span className={styles.emoji}>{city.emoji}</span>
                <h3 className={styles.name}>{city.cityName}</h3>
                <time className={styles.date}>{city.date}</time>
                <button className={styles.deleteBtn} onClick={e => handleDelete(e, city.id)}>&times;</button>
            </Link>
        </li>)}
    </ul>
}

export default CityList;
