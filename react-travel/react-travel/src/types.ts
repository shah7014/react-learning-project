export type TCity = {
    cityName: string,
    country: string,
    emoji: string,
    date: string,
    notes: string,
    position: {
        lat: number,
        lng: number
    },
    id: number | string
}

export type TCountry = {
    country: string, id: number, emoji: string
}

export type TGeoLocationResponse = {
    city?: string;
    locality?: string;
    countryName?: string;
    countryCode: string;
}

export type TUser = {
    name: string,
    email: string,
    password: string,
    avatar: string,
}


