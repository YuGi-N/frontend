import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import styles from '../../../styles/Create.module.css';

const Create = () => {

    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [cast, setCast] = useState([""]);
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

        const setDate = (releaseDate: Date) => {
            const date = releaseDate.getDate().toString().padStart(2, '0');
            const previousMonth = releaseDate.getMonth() + 1;
            const month = previousMonth.toString().padStart(2, '0');
            const year = releaseDate.getFullYear();
            setReleaseDate(`${year}-${month}-${date}`);
        }

        if(router.isReady) {
            const { id } = router.query;
            
            const fetchMovie = async () => {

                const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/movie/' + id, {
                    method: 'GET',
                    credentials: 'include',
                });
    
                if(req.ok) {
                    const data = await req.json();
                    setName(data.movieName);
                    setRating(data.rating);
                    setCast(data.cast ?? [""]);
                    setGenre(data.genre);
                    setDate(new Date(data.releaseDate));
                }
            
            }

            fetchMovie();
        
            if(isSubmit) {
                fetch(process.env.NEXT_PUBLIC_API_URL + '/movie/' + id, {
                    method: 'PUT',
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
                }).then((res) => {
                    router.push('/movie/all');
                })
                .catch((err) => {
                    console.log('Failed to update movie');
                })
            }
        }

    }, [router, isSubmit]);

    return (
        <div>
            <Header />
            <form className={styles.form} onSubmit={handleSubmit}>
                
                <div>
                    <label>Name: </label>
                    <input className={styles.input} type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                
                <div>
                    <label>Rating: </label>
                    <input className={styles.input} type='number'value={rating} onChange={e => setRating(e.target.valueAsNumber)} />
                </div>

                <div className={styles.cast}>
                    <label>Cast: </label>
                    
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

                <button className={styles.addfield} type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Create;