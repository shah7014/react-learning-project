import React from "react";

import styles from "./CountryList.module.css";
import {TCity, TCountry} from "../types.ts";


interface IProps {
    cities: TCity[]
}

const CountryList: React.FC<IProps> = ({cities}) => {

    // To find unique elements using filter
    // const countries = cities
    //     .filter((city, index, self) => index === self.findIndex(c => c.country === city.country))
    //     .map(city => ({country: city.country, id: city.id, emoji: city.emoji}))

    // To find unique elements using reduce
    const countries = cities.reduce<TCountry[]>((acc, currVal) => {
        if (!acc.find(c => c.country === currVal.country)) {
            acc.push({country: currVal.country, id: currVal.id, emoji: currVal.emoji} as TCountry)
        }
        return acc;
    }, [])

    return <ul className={styles.countryList}>
        {countries
            .map(country => <li className={styles.countryItem} key={country.id}>
                <span>{country.emoji}</span>
                <span>{country.country}</span>
            </li>)
        }
    </ul>
}

export default CountryList;
