export type TTodo = {
    id: string,
    userId: number,
    title: string,
    completed: boolean,
    date?: string,
    reactions?: {
        thumbsUp: number,
        wow: number,
        heart: number,
        rocket: number,
        coffee: number
    }
}

