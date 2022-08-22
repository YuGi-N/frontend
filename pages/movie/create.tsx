import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import styles from '../../styles/Create.module.css';

const Create = () => {

    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [cast, setCast] = useState([" "]);
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmit(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> , index: number) => {
        const newCast = [...cast];
        newCast[index] = e.target.value;
        setCast(newCast);
    }

    const addField = () => {
        setCast([...cast, ""]);
    }
    
    const removeField = (index: number) => {
        const newCast = [...cast];
        newCast.splice(index, 1);
        setCast(newCast);
    }

    useEffect(() => {

        const submit = async () => {
            const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/movie', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    movieName: name,
                    rating,
                    cast,
                    genre,
                    releaseDate,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if(req.ok) {
                router.push('/movie/all');
            }
            else {
                console.log('Failed to create movie');
            }
        }

        if(isSubmit) submit();
    }, [isSubmit])

    return (
        <div>
            <Header />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputdata}>
                    <label>Name: </label>
                    <input className={styles.input} type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div>
                    <label>Rating: </label>
                    <input className={styles.input} type='number'value={rating} onChange={e => setRating(e.target.valueAsNumber)} />
                </div>

                <div className={styles.cast}>
                    <label>Cast: </label>
                    <>
                        {
                            cast.map((element, index) => {
                                return (
                                    <div className={styles.castinput} key={index}>
                                        <input className={styles.input} value={element} onChange={e => handleChange(e, index)} />
                                        <button className={styles.addfield} onClick={e => removeField(index)}>-</button>
                                    </div>
                                )
                            })
                        }
                    </>
                    <button className={styles.addfield} type='button' onClick={e => addField()}>+</button>
                </div>

                <div>
                    <label>Genre: </label>
                    <input className={styles.input} type='text' value={genre} onChange={e => setGenre(e.target.value)} />
                </div>

                <div>
                    <label>Release date: </label>
                    <input className={styles.input} type='date' value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
                </div>
                
                <div>
                    <button className={styles.addfield} type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Create;