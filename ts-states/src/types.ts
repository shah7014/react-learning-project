export type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}

export type UserDetail = {
    id: number,
    username: string,
    email: string
}

export type PostDetail = {
    id: number,
    title: string,
    body: string,
    user: UserDetail
}

export type Todo = {
    id: string,
    text: string,
    isCompleted: Status,
    color?: Color
}

export enum Color {
    GREEN = "green",
    BLUE = "blue",
    ORANGE = "orange",
    PURPLE = "purple",
    RED = "red"
}

export enum Status {
    ALL = "all",
    ACTIVE = "active",
    COMPLETED = "completed"
}
