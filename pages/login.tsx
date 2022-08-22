import { useRouter } from 'next/router';
import React, { useState } from 'react';

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
        });

        if(req.ok) {
            router.push('/');
        }
        else {
            console.log('Failed to login');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type='text' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                <label>{}</label>

                <label>Password</label>
                <input type='text' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                <label>{}</label>

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;