import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../../components/header';
import styles from '../../../styles/MovieView.module.css';

const Movie = () => {

    const router = useRouter();
    const [movie, setMovie] = useState<Movie>();
    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if(router.isReady) {
            const { id } = router.query;
            
            const fetchMovie = async () => {

                const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/movie/' + id, {
                    method: 'GET',
                    credentials: 'include',
                });
    
                if(req.ok) {
                    const data = await req.json();
                    setMovie(data);
                }
            
            }

            fetchMovie();

            if(isDelete) {
                fetch(process.env.NEXT_PUBLIC_API_URL + '/movie/' + id, {
                    method: 'DELETE',
                    credentials: 'include',
                }).then((res) => {
                    router.push('/movie/all');
                }).catch((err) => {
                    console.log('Failed to delete movie');
                });
            }

            if(isUpdate) {
                router.push(`/movie/${id}/update`);
            }
        }
    }, [router, isDelete, isUpdate]);

    return (
        <div>
            <Header />
            <div className={styles.info}>
                <p>Movie Name: {movie?.movieName}</p>
                <p>Rating: {movie?.rating}</p>
                <p>Cast: </p>
                <ul>{movie?.cast?.map((actor, index) => <li key={index}>{actor}</li>)}</ul>
                <p>Genre: {movie?.genre}</p>
                <p>Released on: {movie?.releaseDate?.split('T')[0]}</p>
                <button className={styles.deletebutton} onClick={() => setIsDelete(true)}>Delete</button>
                <button className={styles.updatebutton} onClick={() => setIsUpdate(true)}>Update</button>
            </div>
        </div>
    )
}

export default Movie;