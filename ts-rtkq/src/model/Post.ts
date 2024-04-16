export type TPost = {
    id: string,
    userId: number,
    title: string,
    body: string,
    date?: string,
    reactions?: {
        thumbsUp: number,
        wow: number,
        heart: number,
        rocket: number,
        coffee: number
    }
}

