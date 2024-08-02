import React, {useEffect, useState} from "react";
import styles from "./LoginPage.module.css";
import Navbar from "../components/Navbar.tsx";
import {useAuthContext} from "../context/FakeAuthContext.tsx";
import {useNavigate} from "react-router-dom";


const LoginPage: React.FC = () => {

    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");

    const {login, isAuthenticated} = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) {
            navigate("/app", {replace: true});
        }
    }, [isAuthenticated]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email && password) {
            login(email, password);
        }
    }

    return <main className={styles.loginPage}>

        <Navbar/>

        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <div>
                <button type={'submit'} className={'cta'}>Login</button>
            </div>
        </form>
    </main>
}

export default LoginPage;
