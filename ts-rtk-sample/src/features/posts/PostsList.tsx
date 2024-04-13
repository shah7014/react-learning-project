import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts, selectAllPostIds} from "./postsSlice";
import {Grid} from "@mui/material";
import {AppDispatch} from "../../state/store";
import PostDetail from "./PostDetail";


const PostsList = () => {

    const postIds = useSelector(selectAllPostIds);


    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await dispatch(loadPosts()).unwrap();
                console.log(response)
            } catch(err) {
                console.log(err);
            }
        }

        getPosts();
    }, [])

    return <Grid container>
        {postIds.map(id => (<PostDetail postId={id} key={id}/>))}
    </Grid>
}

export default PostsList;

