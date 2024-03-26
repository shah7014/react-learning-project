import React from "react";
import {Post} from "../types";

const PostCard: React.FC<Post> = ({body, title, id} : Post) => {

    const handleDelete = (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Post to be deleted:-", id);
    }

    return <div>
        <h3>{title}</h3>
        <p>{body}</p>
        <button onClick={handleDelete(id)}>Delete</button>
    </div>
}


export default PostCard;
