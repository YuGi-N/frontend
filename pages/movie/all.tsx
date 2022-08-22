import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react'

const Movies: NextPage = () => {

    const [movies, setMovies] = useState({});
	
	useEffect(() => {
		const fetchMovies = async () => {
			const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/movie', {
				method: 'GET',
				credentials: 'include',
			});

            const data = await req.json();

			if(req.ok) {
				setMovies(data);
			}
		}

		fetchMovies();
	}, [])

	return (
		<>
            {JSON.stringify(movies)}
		</>
	)
}

export default Movies;