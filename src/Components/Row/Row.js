import axios from '../../axios';
import React, { useEffect, useState } from 'react';

const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchURL, isLargeRow }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchURL);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchURL]);

	console.table(movies);

	return (
		<div className='row'>
			<div className='row__heading p-4'>
				<h2 className='text-left font-bold font-sans'>{title}</h2>
			</div>
			<div className='row__items flex space-x-2 overflow-x-scroll overflow-scroll-none p-4'>
				{movies.map((movie) => (
					<div
						className='item flex-shrink-0 flex-grow-0 w-1/6'
						key={movie.id}>
						<img
							className='transition duration-500 transform hover:scale-105'
							src={`${base_url}${
								isLargeRow
									? movie.poster_path
									: movie.backdrop_path
							}`}
							alt={movie.name}
						/>
						<span className='mt-2 block'>{movie.name}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default Row;
