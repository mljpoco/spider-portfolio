import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {

  const [xState, toggleX] = useState('./x-regular.png');
  const [count, setCount] = useState(0);

  const myRef = useRef(null);

  useEffect(() => {
    setTimeout(function () {
      myRef.current.scrollIntoView({behavior: 'smooth'});
    }, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div className='flex-wrapper contact-page'>
      <img className='x' src={xState} onMouseOver={() => toggleX('./x-active.png')} onMouseLeave={() => toggleX('./x-regular.png')} onClick={() => navigate(-1)} />
      <h2 ref={myRef}>Contact Form</h2>
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
  );
} 