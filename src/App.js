import './App.css';
import Banner from './Components/Banner/Banner';
import Row from './Components/Row/Row';
import requests from './request';

function App() {
	return (
		<div className='App'>
			<Banner />
			<Row
				title='Netflix Originals'
				fetchURL={requests.fetchNetflixOriginals}
				isLargeRow
			/>
			<Row title='Trending Now' fetchURL={requests.fetchTending} />
			<Row title='Top Rated' fetchURL={requests.fetchTopRated} />
			<Row title='Action Movies' fetchURL={requests.fetchActionMovies} />
			<Row title='Documentaries' fetchURL={requests.fetchDocumentaries} />
			<Row title='Comedy Movies' fetchURL={requests.fetchComedyMovies} />
			<Row title='Horror Movies' fetchURL={requests.fetchHorrorMovies} />
			<Row
				title='Romance Movies'
				fetchURL={requests.fetchRomanceMovies}
			/>
		</div>
	);
}

export default App;
