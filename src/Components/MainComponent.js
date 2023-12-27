import { Route, Routes, Link } from 'react-router-dom';
import News from './NewsComponent';
import Weather from './WeatherComponent';
import Astronomy from './AstronomyComponent';

export default function Main() {



	return (
		<main className='main-flex-wrapper'>
			<div className='personal dark'>
				<header className='flex-wrapper light'>
					<span className='name'>Mitchell Poco</span>
					<span>Software Developer, Author</span>
					<div className='h-line'></div>
					<Link className='contact'>Contact Me</Link>
				</header>
				<figure className='grid-container'>
					<img src='./thumbnail.png' />
					<img src='./thumbnail.png' />
					<img src='./thumbnail.png' />
					<img src='./thumbnail.png' />
					<p><em>
					- "Mitchell built and deployed a front end from scratch on a tight timeline for presentation to the UN. He's dynamic and professional in his approach to problem solving, and a strong addition to any development team."
					</em></p>
				</figure>
			</div>
			<div className='fetched-flex-wrapper light'>
				<Routes>
					<Route path='/' element={<News />} />
					<Route path='/weather' element={<Weather />} />
					<Route path='/astronomy' element={<Astronomy />} />
				</Routes>
				<footer className='flex-wrapper dark'>
					<Link to='/' >News</Link>
					<Link to='/weather' >Weather</Link>
					<Link to='/astronomy' >Astronomy</Link>
				</footer>
			</div>
		</main>
	);
}