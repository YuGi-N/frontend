import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Create = () => {

    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [cast, setCast] = useState(["test", "test"]);
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
                    setCast(data.cast);
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
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type='text' value={name} onChange={e => setName(e.target.value)} />

                <label>Rating: </label>
                <input type='number'value={rating} onChange={e => setRating(e.target.valueAsNumber)} />

                <label>Cast: </label>
                
                {
                    cast.map((element, index) => {
                        return (
                            <div key={index}>
                                <input value={element} onChange={e => handleChange(e, index)} />
                                <button onClick={e => removeField(index)}>-</button>
                            </div>
                        )
                    })
                }
                <button onClick={e => addField()}>+</button>

                
                <label>Genre: </label>
                <input type='text' value={genre} onChange={e => setGenre(e.target.value)} />

                <label>Release date: </label>
                <input type='date' value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Create;