import { Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import News from './NewsComponent';
import Weather from './WeatherComponent';
import Astronomy from './AstronomyComponent';

export default function Main() {

  const [isModalHidden, toggleModal] = useState(true);
  const [xState, toggleX] = useState('./x-regular.png');
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true);
  }, []);

  const detectKeyDown = (e) => {
    console.log(isModalHidden)
    if (!isModalHidden && e.key === 'Escape') {
      toggleModal(!isModalHidden);
    }
  }

  function dim() {
    return isModalHidden ? 'main-flex-wrapper' : 'main-flex-wrapper dim';
  }

  return (
    <>
      <div className='modal-wrapper' hidden={isModalHidden}>
        <div className='flex-wrapper modal'>
          <img className='x' onClick={() => toggleModal(!isModalHidden)} src={xState} onMouseOver={() => toggleX('./x-active.png')} onMouseLeave={() => toggleX('./x-regular.png')} />
          <h2>Contact Form</h2>
          <form action='https://formsubmit.co/mitchpoco@mitchpo.co' method='POST' className='flex-wrapper contact-form'>
            <label htmlFor='name'>
              Your Name
            </label>
            <input id='name' name='name' required />
            <label htmlFor='email'>
              Your Email
            </label>
            <input type='email' id='email' name='email' required />
            <label htmlFor='message'>
              Your Message
            </label>
            <textarea id='message' name='message' maxLength={5000} rows={6} onChange={e => setCount(e.target.value.length)} required />
            <span className='count'>{count} of 5000 characters.</span>
            <button className='contact-btn' onMouseDown={(e) => e.preventDefault()}><b>Send</b></button>
          </form>
        </div>
      </div>
      <main className={dim()}>
        <div className='personal dark'>
          <header className='flex-wrapper light'>
            <span className='name'>Mitchell Poco</span>
            <span className='titles'>React Developer, Author</span>
            <div className='h-line'></div>
            <a onClick={() => toggleModal(!isModalHidden)} className='contact'>Contact Me</a>
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