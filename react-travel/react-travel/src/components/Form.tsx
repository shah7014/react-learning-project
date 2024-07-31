import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {TCity, TGeoLocationResponse} from "../types.ts";
import {useCitiesContext} from "../context/CitiesContext.tsx";

export function convertToEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const API_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("")

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const {saveNewCity} = useCitiesContext();

    useEffect(() => {

        const fetchCityData = async (lat: string, lng: string): Promise<void> => {
            try {
                const response = await fetch(`${API_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await response.json() as TGeoLocationResponse;
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName || "");
                setEmoji(convertToEmoji(data.countryCode));
            } catch (err) {
                console.log(err);
            }
        }


        if (lat && lng) {
            fetchCityData(lat, lng);
        }
    }, [lat, lng]);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity: Omit<TCity, "id"> = {
            cityName,
            date: date.toString(),
            emoji,
            notes,
            position: {lat: Number(lat), lng: Number(lng)},
            country
        }

        console.log("DATA:-", newCity);
        await saveNewCity(newCity);

        navigate("/app");
    }

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                {/*<input*/}
                {/*    id="date"*/}
                {/*    onChange={(e) => setDate(e.target.value)}*/}
                {/*    value={date}*/}
                {/*/>*/}
                <DatePicker id={"date"} selected={date} onChange={d => setDate(d)} dateFormat={'dd/MM/yyyy'}/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button onClick={() => {
                }} type={'primary'} btnType={'submit'}>Add</Button>
                <Button onClick={(event) => {
                    event.preventDefault();
                    navigate(-1);
                }}
                        type={'back'}
                >&larr; Back</Button>
            </div>
        </form>
    );
}

export default Form;
