import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import News from './NewsComponent';
import Weather from './WeatherComponent';
import Astronomy from './AstronomyComponent';

export default function Main() {

  const [isModalHidden, toggleModal] = useState(true);
  const [xState, toggleX] = useState('./x-regular.png');

  function dim() {
    return isModalHidden ? 'main-flex-wrapper' : 'main-flex-wrapper dim';
  }

  return (
    <>
      <div className='modal' hidden={isModalHidden} >
        <div className='flex-wrapper'>
          <img className='x' onClick={() => toggleModal(isModalHidden => !isModalHidden)} src={xState} onMouseOver={() => toggleX('./x-active.png')} onMouseLeave={() => toggleX('./x-regular.png')} />
          <form ></form>
        </div>
      </div>
      <main className={dim()}>
        <div className='personal dark'>
          <header className='flex-wrapper light'>
            <span className='name'>Mitchell Poco</span>
            <span>React Developer, Author</span>
            <div className='h-line'></div>
            <a onClick={() => toggleModal(isModalHidden => !isModalHidden)} className='contact'>Contact Me</a>
          </header>
          <figure className='grid-container'>
            <img src='./thumbnail.png' />
            <img src='./thumbnail.png' />
            <img src='./thumbnail.png' />
            <img src='./thumbnail.png' />
            <p>
              — "His skills and abilities for web development, web page design, and web connectedness always amazed me and if he was not aware of some small detail, he found the answer quickly. I would not hesitate to recommend him."
            </p>
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
    </>
  );
}