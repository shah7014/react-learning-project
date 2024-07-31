import {useState} from "react";

export const useGeoLocation = (defaultPosition = null) => {
    const [position, setPosition] = useState<{ lat: number, lng: number } | null>(defaultPosition);

    const getPosition = () => {
        if (!navigator.geolocation)
            console.error('Your browser does not suppoert geo location');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            }
        )
    }

    return {position, getPosition}
}



