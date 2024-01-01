import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

async function fetchWeather(loc) {
	const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=9d3828c4896b4c85a4e145942232612&q=${loc}`);
	return res.data;
}

export default function Weather() {

	const [location, setLocation] = useState(JSON.parse(localStorage.getItem('location')) || 'auto:ip');
	const [isFahrenheit, switchTemp] = useState(JSON.parse(localStorage.getItem('isFahrenheit')) || true);

	useEffect(() => {
		localStorage.setItem('location', JSON.stringify(location));
		localStorage.setItem('isFahrenheit', JSON.stringify(isFahrenheit))
	}, [location, isFahrenheit]);

	const { data: weatherData, isLoading, error } = useQuery(['weatherData', location], () => fetchWeather(location));

	if (isLoading) {
		return <h1 className='loading'>Loading...</h1>
	}
	if (error) {
		return <h1 className='error'>Error: {error.message}</h1>
	}
	//weatherData.temp_f.toString()
	return (
		<>
			<h1><u>Weather in {weatherData.location.name}</u></h1>
			<ul className='settings'>
				<span onClick={() => switchTemp(!isFahrenheit)}>Change Unit</span>
			</ul>
			<figure className='weather-box flex-wrapper'>
				<div className='weather-form'>
					<form onSubmit={e => {
						e.preventDefault()
						setLocation(e.target[0].value)
					}}>
						<label htmlFor='city' />
						<input name='city' id='city' type='text' placeholder='Enter City' />
						<button className='weather-submit' type='submit'>GO</button>
					</form>
				</div>
				<div className='flex-wrapper weather-details'>
					<img className='weather-condition-icon' src={weatherData.current.condition.icon} />
					<text className='temp'>{isFahrenheit ? weatherData.current.temp_f.toString() + '°F' : weatherData.current.temp_c.toString() + '°C'}</text>
					<text className='weather-condition-text'>{weatherData.current.condition.text}</text>
				</div>
				<div>other data</div>
			</figure>
		</>
	);
}