import React from "react";
import {Post} from "../../types";
import {useSelector} from "react-redux";
import {userByIdSelector} from "../users/usersSlice";
import {Typography} from "@mui/material";
import {RootState} from "../../state/store";

const PostAuthor = ({post}: {post: Post}) => {

    const user = useSelector((state: RootState) => userByIdSelector(state, post.userId))

    return <>
        <Typography variant={"h6"}>{user ? user.name : "Unknown Author"}</Typography>
    </>
}

export default PostAuthor;

