import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';

const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/login', {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        });

        if(req.ok) {
            router.push('/movie/all');
        }
        else {
            console.log('Failed to login');
        }
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.flexform} onSubmit={handleSubmit}>
                <input className={styles.input} type='text' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                <input className={styles.input} type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                <button className={styles.loginbutton} type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;
