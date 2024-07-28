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
    id: number
}

export type TCountry = {
    country: string, id: number, emoji: string
}
