import React from "react";
import {useGetAllUsersQuery} from "../users/usersSlice";
import {Link} from "react-router-dom";

const PostAuthor = ({userId}: { userId: number }) => {

    const {user} = useGetAllUsersQuery(undefined, {
        selectFromResult: ({data, isLoading}) => ({
            user: data?.entities[userId]
        })
    })

    return <>
        {user ? <Link to={`/users/${userId}`}>{user.name}</Link> : "Unknown Author"}
    </>
}

export default PostAuthor;
