import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {LatLngTuple, LeafletMouseEvent} from "leaflet";

import styles from "./Map.module.css";
import {useCitiesContext} from "../context/CitiesContext.tsx";
import {useGeoLocation} from "../hooks/useGeoLocation.ts";
import Button from "./Button.tsx";


const Map: React.FC = () => {

    const {cities} = useCitiesContext();

    const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0])

    const [searchParams] = useSearchParams();

    const {position: geoLocationPosition, getPosition} = useGeoLocation();


    useEffect(() => {
        const mapLat = searchParams.get('lat');
        const mapLng = searchParams.get('lng');

        if (mapLat && mapLng) {
            setMapPosition([Number(mapLat), Number(mapLng)]);
        }
    }, [searchParams]);

    useEffect(() => {
        if (geoLocationPosition?.lat && geoLocationPosition.lng) {
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
        }
    }, [geoLocationPosition]);


    return <div className={styles.mapContainer}>
        <Button type={'position'} onClick={() => getPosition()}>Get Position</Button>
        <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {cities.map(city => <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                <Popup>
                    {city.cityName}
                </Popup>
            </Marker>)}

            <Changecenter position={mapPosition}/>

            <DetectClick/>
        </MapContainer>
    </div>
}

const Changecenter = ({position}: { position: LatLngTuple }) => {
    const map = useMap();
    map.setView(position);
    return null;
}

const DetectClick = () => {
    const navigate = useNavigate();

    useMapEvents({
        click: (e: LeafletMouseEvent) => {
            navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    })

    return null;
}

export default Map;
