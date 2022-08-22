import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react'
import Header from '../../components/header';
import Movie from '../../components/movie';
import styles from '../../styles/AllMovies.module.css';

const Movies: NextPage = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
	const router = useRouter();
	
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
		<div>
			<Header />
			<button className={styles.createbutton} onClick={() => router.push('/movie/create')}>+ Create</button>
            <div className={styles.moviegrid}>
				{
					movies.map((movie, index) => {
						return (
							<Movie key={index} {...movie} />
						)
					})
				}
			</div>
		</div>
	)
}

export default Movies;