import { Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import News from './NewsComponent';
import Weather from './WeatherComponent';
import Astronomy from './AstronomyComponent';
import Contact from './ContactComponent';

export default function Main() {

  const [isFaceHidden, hideFace] = useState(true);

  function scrollTop() {
    let top = document.getElementById('top');
    setTimeout(function () {
      top.scrollIntoView({ behavior: "smooth" });;
    }, 0);
    
    console.log('triggered')
  }

  return (
    <>
      <main className='main-flex-wrapper'>
        <div className='personal dark'>
          <header className='flex-wrapper light'>
            <span className='name'>Mitchell Poco</span>
            <span className='titles'>Software Developer, Author</span>
            <Link to='/contact' onMouseEnter={() => hideFace(false)} onMouseLeave={() => hideFace(true)} className='contact'>Contact Me</Link>
          </header>
          <figure className='grid-container'>
            <a href='https://rockstarelite.xyz' target='_blank'><img src='./rse-thumb.webp' /></a>
            <a href='https://mitchpo.co' target='_blank'><img src='./dpp-thumb.webp' /></a>
            <a href='https://indigenouslanguages.org' target='_blank'><img src='./dill-thumb.webp' /></a>
            <a href='https://wearymuser.xyz/index.html' target='_blank'><img src='./wm-thumb.webp' /></a>
            <p>
              — "His skills and abilities for web development, web page design, and web connectedness always amazed me and if he was not aware of some small detail, he found the answer quickly. I would not hesitate to recommend him."
            </p>
          </figure>
        </div>
        <div className='fetched-flex-wrapper light'>
          <span id='top'></span>
          <img className='cropface' src='./cropface.png' hidden={isFaceHidden} />
          <Routes>
            <Route exact path='/' element={<News />} />
            <Route path='/weather' element={<Weather />} />
            <Route path='/astronomy' element={<Astronomy />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
          <footer className='flex-wrapper dark'>
            <Link to='/' onClick={() => scrollTop()}>News</Link>
            <Link to='/weather' onClick={() => scrollTop()}>Weather</Link>
            <Link to='/astronomy' onClick={() => scrollTop()}>Astronomy</Link>
          </footer>
        </div>
      </main>
    </>
  );
}