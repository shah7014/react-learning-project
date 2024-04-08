import {UserApiResultsSchema, UserResponse} from "../models/user";

export const fetchUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            return undefined;
        }

        const usersJson: UserResponse = await response.json();

        const parsedData = UserApiResultsSchema.parse(usersJson);

        console.log(parsedData);

        return parsedData;
    } catch(err) {
        console.log(err);
    }
}