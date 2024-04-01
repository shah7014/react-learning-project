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
