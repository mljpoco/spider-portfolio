import { useQuery } from 'react-query';
import axios from 'axios';

async function fetchApod() {
  const res = await axios.get('https://api.nasa.gov/planetary/apod?api_key=yzHmFyCnb9JPi4Tl6FkVbUWYwlO1RrhyCxNNHguy');
  return res.data;
}

export default function Astronomy() {

  const { data: apod, isLoading, error } = useQuery('apod', fetchApod);

  if (isLoading) {
    return <h1 className='loading'>Loading...</h1>
  }

  if (error) {
    return <h1 className='error'>Error: {error.message}</h1>
  }

  return (
    <>
      <h1><u>NASA Astronomy Picture of the Day</u></h1>
      <figure className='flex-wrapper apod-wrapper'>
        <h3><em>{apod.title}</em></h3>
        <img className='apod' src={apod.url} />
        <p className='apod-desc'>{apod.explanation}</p>
      </figure>
    </>
  );
}