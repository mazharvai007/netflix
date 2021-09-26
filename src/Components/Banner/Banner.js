import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import requests from '../../request';
import './Banner.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Banner() {
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length)
				]
			);

			return request;
		}

		fetchData();
	}, []);

	/**
	 * Desription short with (...)
	 */
	function truncate(str, number) {
		return str?.length > number ? str.substr(0, number - 1) + '...' : str;
	}

	// console.log(movie);

	return (
		<header
			className='banner h-96 object-contain relative'
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
				backgroundPosition: 'center center',
			}}>
			<div className='banner__contents text-white ml-8 pt-32 h-48'>
				<h1 className='text-5xl font-extrabold pb-1.5'>
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<div className='banner__buttons'>
					<button className='banner_button text-white outline-none border-none font-bold rounded-xsm pl-8 pr-8 pt-2 pb-2 mr-4 bg-bannerButtonNormal bg-opacity-50 cursor-pointer hover:bg-bannerButtonHover hover:text-black'>
						Play
					</button>
					<button className='banner_button text-white outline-none border-none font-bold rounded-xsm pl-8 pr-8 pt-2 pb-2 mr-4 bg-bannerButtonNormal bg-opacity-50 cursor-pointer hover:bg-bannerButtonHover hover:text-black'>
						My List
					</button>
				</div>
				<div className='banner__description leading-snug pt-4 text-sm max-w-sm h-20'>
					{truncate(movie.overview, 150)}
				</div>
			</div>
			<div className='banner__fadeBottom'></div>
		</header>
	);
}

export default Banner;
