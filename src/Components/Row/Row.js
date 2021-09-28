import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchURL, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	/**
	 * Fetch data from TMDB
	 */
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchURL);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchURL]);

	// YouTube video
	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		if (trailerUrl) {
			/**
			 * Check if trailerURL is available then setTrailerURl will be go to empty
			 * I mean when a trailer is playing then setTrailerURL will be stop
			 */
			setTrailerUrl('');
		} else {
			//Find movie name on YouTube
			movieTrailer(
				movie?.name || movie?.title || movie?.original_name || ''
			)
				.then((url) => {
					// Make URL then search
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<div className='row'>
			<div className='row__heading p-4'>
				<h2 className='text-left font-bold font-sans text-white'>
					{title}
				</h2>
			</div>
			<div className='row__items flex space-x-4 overflow-x-scroll overflow-scroll-none p-4'>
				{movies.map((movie) => (
					<div
						className='item w-1/6 flex-shrink-0 flex-grow-0'
						key={movie.id}>
						<img
							className='transition duration-500 transform hover:scale-105'
							onClick={() => handleClick(movie)}
							src={`${base_url}${
								isLargeRow
									? movie.poster_path
									: movie.backdrop_path
							}`}
							alt={movie.name}
						/>
						<span className='mt-2 block text-white'>
							{movie?.name ||
								movie?.title ||
								movie?.original_name}
						</span>
					</div>
				))}
			</div>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
