import React, {useEffect} from "react";
import {useAuthContext} from "../context/FakeAuthContext.tsx";
import {useNavigate} from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {isAuthenticated} = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated]);


    return isAuthenticated ? children : null;
}

export default ProtectedRoute;
