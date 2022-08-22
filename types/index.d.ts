interface Movie {
	_id: string,
	movieName: string | null,
	rating: number | null,
	cast: string[] | null,
	genre: string | null,
	releaseDate: string | null,
}