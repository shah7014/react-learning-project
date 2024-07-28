import styles from "./City.module.css";
import {NavLink, useParams} from "react-router-dom";
import Message from "./Message.tsx";
import {TCity} from "../types.ts";
import React from "react";

// const formatDate = (date) =>
//     new Intl.DateTimeFormat("en", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//         weekday: "long",
//     }).format(new Date(date));

interface IProps {
    cities: TCity[];
}

const City: React.FC<IProps> = ({cities}) => {

    const {cityId} = useParams();

    if (!cityId) {
        return <Message message={'Invalid City Name'}/>
    }

    const currentCity = cities.find(c => c.id.toString() === cityId);

    if(!currentCity) {
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
