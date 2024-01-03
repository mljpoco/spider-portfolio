import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

async function fetchWeather(loc) {
	const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=9d3828c4896b4c85a4e145942232612&q=${loc}`);
	console.log(res.data);
	return res.data;
}

export default function Weather() {

	const [location, setLocation] = useState(JSON.parse(localStorage.getItem('location')) || 'auto:ip');
	const [tempUnit, switchTemp] = useState(JSON.parse(localStorage.getItem('tempUnit')) || 'F');

	useEffect(() => {
		localStorage.setItem('location', JSON.stringify(location));
		localStorage.setItem('tempUnit', JSON.stringify(tempUnit));
	}, [location, tempUnit]);

	const { data: weatherData, isLoading, error } = useQuery(['weatherData', location], () => fetchWeather(location));

	if (isLoading) {
		return <h1 className='loading'>Loading...</h1>
	}
	if (error && error.code === "ERR_BAD_REQUEST") {
		return (
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifySelf: 'center'}}>
				<h2 className='helsinki'> The location must be on Earth... For example:</h2>
				<button onClick={() => setLocation('helsinki')}><b>Helsinki</b></button>
			</div>
		);
	}
	if (error) {
		return <h1 className='loading'>Error: {error.message}</h1>
	}

	return (
		<>
			<h1><u>Weather in {weatherData.location.name}</u></h1>
			<ul className='settings flex-wrapper'>
				<span onClick={() => {
					tempUnit === 'F' ? switchTemp('C') : switchTemp('F');
				}}>Switch Units</span>
				<span onClick={() => {
					setLocation('auto:ip');
				}}>Current Location</span>
			</ul>
			<figure className='weather-box flex-wrapper'>
				<div>
					<form onSubmit={e => {
						e.preventDefault()
						setLocation(e.target[0].value)
					}}>
						<label htmlFor='city' />
						<input name='city' id='city' type='text' placeholder='Enter City' required />
						<button type='submit'><b>GO</b></button>
					</form>
				</div>
				<div className='flex-wrapper weather-details'>
					<text className='temp'>{tempUnit === 'F' ? weatherData.current.temp_f.toString() + '°F' : weatherData.current.temp_c.toString() + '°C'}</text>
					<img className='weather-icon' src={weatherData.current.condition.icon} />
					<text className='weather-condition-text'>{weatherData.current.condition.text}</text>
				</div>
				<ul className='other-data flex-wrapper'>
					<span className='odd'>Feels: {tempUnit === 'F' ? weatherData.current.feelslike_f + '°F' : weatherData.current.feelslike_f + '°C'}</span>
					<span className='even'>Humidity: {weatherData.current.humidity}%</span>
					<span className='odd'>Precipitation: {tempUnit === 'F' ? weatherData.current.precip_in + 'in' : weatherData.current.precip_mm + 'mm'}</span>
					<span className='even'>Visibility: {tempUnit === 'F' ? weatherData.current.vis_miles + 'mi' : weatherData.current.vis_km + 'km'}</span>
				</ul>
			</figure>
		</>
	);
}