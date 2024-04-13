import React from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../state/store";
import {userByIdSelector} from "./usersSlice";
import {postsByUserIdMemoizedSelector} from "../posts/postsSlice";
import {Button, Stack, Typography} from "@mui/material";

const UserPage = () => {

    const {id} = useParams();

    const user = useSelector((state: RootState) => userByIdSelector(state, Number(id)));

    const userPosts = useSelector((state: RootState) => postsByUserIdMemoizedSelector(state, Number(id)));

    return <>
        {!!user ? <>
            <Typography variant={"h4"}>{user.name}</Typography>

            <Stack
                flexDirection={"column"}
                alignItems={"flex-start"}
                sx={{marginTop: "2rem"}}
            >
                {userPosts.length > 0 && userPosts.map(post => <Button component={Link}
                                                                       to={`/posts/${post.id}`}>{post.title}</Button>)}
            </Stack>

        </> : <Typography variant={"h4"} color={"error"}>User Not Found</Typography>}
    </>
}

export default UserPage;

