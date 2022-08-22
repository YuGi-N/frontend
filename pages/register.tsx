import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface InputValues {
    name: string,
    email: string,
    password: string,
    mobile?: string,
    country?: string,
    city?: string,
    state?: string,
    message?: string,
}

interface FormErrors {
    nameError?: string,
    emailError?: string,
    passwordError?: string,
}

const Register = () => {

    const router = useRouter();
    const initialValues: InputValues= {
        name: '',
        email: '',
        password: '',
        mobile: '',
        country: '',
        city: '',
        state: '',
        message: '',
    }

    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors(validateForm());
        setIsSubmit(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const validateForm = () => {
        const errors: FormErrors = {}
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!formData.name) {
            errors.nameError = 'Name is required';
        }

        if(!formData.email) {
            errors.emailError = 'Email is required';
        }
        else if(!emailRegex.test(formData.email)) {
            errors.emailError = 'Enter valid email address';
        }

        if(!formData.password) {
            errors.passwordError = 'Password is required';
        }
        else if(formData.password.length < 4) {
            errors.passwordError = 'Password must be longer than 4 characters';
        }
 
        return errors;
    }

    useEffect(() => {

        const registerUser = async () => {
            const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(req.ok) {
                router.push('/login');
            }
            else {
                console.log('Failed to register user');
            }
        }

        if(Object.keys(formErrors).length === 0 && isSubmit) {
            registerUser();
        }
    }, [formErrors]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type='text' placeholder='Name' name='name' onChange={handleChange} />
                <label>{formErrors.nameError}</label>

                <label>Email:</label>
                <input type='text' placeholder='Email' name='email' onChange={handleChange} />
                <label>{formErrors.emailError}</label>

                <label>Password:</label>
                <input type='password' placeholder='Password' name='password' onChange={handleChange} />
                <label>{formErrors.passwordError}</label>

                <label>Mobile:</label>
                <input type='text' placeholder='Mobile' name='mobile' onChange={handleChange} />

                <label>Country:</label>
                <input type='text' placeholder='Country' name='country' onChange={handleChange} />

                <label>City:</label>
                <input type='text' placeholder='City' name='city' onChange={handleChange} />

                <label>State:</label>
                <input type='text' placeholder='State' name='state' onChange={handleChange}/>

                <label>Message:</label>
                <input type='text' placeholder='Message' name='message' onChange={handleChange}/>

                <button type='submit'>Sign up</button>

            </form>
        </div>
    )
}

export default Register;