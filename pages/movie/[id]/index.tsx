import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Movie = () => {

    const router = useRouter();
    const [movie, setMovie] = useState({});
    const [isDelete, setIsDelete] = useState(false);

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
        }
    }, [router, isDelete]);

    return (
        <>
            {JSON.stringify(movie)}
            <button onClick={() => setIsDelete(true)}>Delete</button>
        </>
    )
}

export default Movie;