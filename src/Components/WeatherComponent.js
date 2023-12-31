import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

async function fetchWeather(loc) {
    const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=9d3828c4896b4c85a4e145942232612&q=${loc}`);
    console.log(res.data);
    return res.data.current;
}

export default function Weather() {

    const [location, setLocation] = useState('auto:ip');
    const { data: weatherData, isLoading, error } = useQuery(['weatherData', location], () => fetchWeather(location));

    if (isLoading) {
        return <h1 className='loading'>Loading...</h1>
    }
    if (error) {
        return <h1 className='error'>Error: {error.message}</h1>
    }

    return (
        <figure className='weather-box flex-wrapper'>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setLocation(e.target[0].value)
                }}>
                    <label htmlFor='city' />
                    <input name='city' id='city' type='text' placeholder='Enter City' />
                    <button className='weather-submit' type='submit'>GO</button>
                </form>
            </div>
            <div>
                <img className='weather-condition-icon' src={weatherData.condition.icon} />
                <text className='temp'>{weatherData.temp_f.toString()}</text>
                <text className='weather-condition-text'>{weatherData.condition.text}</text>
            </div>
            <div>other data</div>
        </figure>
    );
}