import React, {useEffect} from "react";

import styles from "./City.module.css";
import {NavLink, useParams} from "react-router-dom";
import Message from "./Message.tsx";
import {useCitiesContext} from "../context/CitiesContext.tsx";

const City: React.FC = () => {

    const {cityId} = useParams();
    const {getCurrentCity, currentCity} = useCitiesContext();

    useEffect(() => {
        if (cityId) {
            getCurrentCity(cityId);
        }
    }, [cityId, getCurrentCity]);

    if (!currentCity) {
        return <Message message={'City Not FOund'}/>
    }

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{currentCity.emoji}</span> {currentCity.cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {currentCity.cityName} on</h6>
                <p>{currentCity.date}</p>
            </div>

            {currentCity.notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{currentCity.notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {currentCity.cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <NavLink to={'/app/cities'}>Go Back</NavLink>
            </div>
        </div>
    );
}

export default City;
