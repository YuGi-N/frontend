import styles from '../styles/Movie.module.css';
import { FC, useReducer } from 'react';
import { useRouter } from 'next/router';

const MovieCard = ({_id, movieName, rating, cast, genre, releaseDate} : Movie) => {

    const router = useRouter();

    return (
        <div className={styles.wrapper} onClick={() => router.push('/movie/' + _id)} >
            <p className={styles.name}>{movieName}</p>
            <div className={styles.info}>
                {
                    releaseDate ?
                    <p>{releaseDate.split('T')[0]}</p> : 
                    <p>-</p>
                }
                    <p className={styles.fill}></p>
                    <p>{rating}</p>
            </div>
        </div>
    )
}

export default MovieCard;