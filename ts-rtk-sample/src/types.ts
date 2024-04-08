export type ReactionsType = "thumbsUp" | "rocket" | "coffee";

export type Post = {
    id: number,
    title: string,
    body: string,
    userId: number,
    reactions: Record<ReactionsType, number>
}

export type User = {
    id: number,
    name: string,
    username: string,
    email: string
}





