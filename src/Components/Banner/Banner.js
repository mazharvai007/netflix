import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import requests from '../../request';

function Banner() {
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
		}

		fetchData();
	}, []);

	return <div></div>;
}

export default Banner;
