export type TComment = {
    id: string,
    body: string,
    tagIds: string[],
    likeIds: string[]
}

export type TCommentResponse = {
    id: string,
    body: string,
    tags: TTag[],
    likes: TLike[]
}

export type TTag = {
    id: string,
    jobType: string
}

export type TLike = {
    id: string,
    suffix: string
}

export type TKnownError = {
    message: string
}


