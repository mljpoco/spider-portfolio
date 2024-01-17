import { useState, useEffect } from 'react';
import { useQueries } from 'react-query';
import axios from 'axios';

async function fetchNews(cat) {
  let date = new Date();
  date.setDate(date.getDate() - 11);
  const boutAWeekAgo =
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString().padStart(2, '0')}-${(date.getDate())
        .toString().padStart(2, '0')}`;
        
  const res = await axios.get(`https://api.thenewsapi.com/v1/news/top?api_token=T1evILD6QWIuHu9RYAMczqHIUQIFwG5qNlW2zpoB&language=en&categories=${cat}&published_after=${boutAWeekAgo}`);
  //avoiding duplicates
  const everyImg = res.data.data.map(article => article.image_url);
  res.data.data = res.data.data.filter(article => {
    let presence = everyImg.indexOf(article.image_url);
    if (everyImg.indexOf(article.image_url, presence + 1) < 0 && article.image_url.includes('https') && article.url.includes('https')) {
      return article.image_url;
    }
  });

  res.data.cat = cat;

  return res.data;
}

export default function News() {

  const [category, setCategory] = useState(JSON.parse(localStorage.getItem('category')) || 'tech');
  const [arrow, setArrow] = useState('./up-arrow.png')

  useEffect(() => {
    localStorage.setItem('category', JSON.stringify(category));
  }, [category]);

  const cats = useQueries([
    { queryKey: ['tech', 'tech'], queryFn: () => fetchNews('tech') },
    { queryKey: ['health', 'health'], queryFn: () => fetchNews('health') },
    { queryKey: ['science', 'science'], queryFn: () => fetchNews('science') },
    { queryKey: ['business', 'business'], queryFn: () => fetchNews('business') },
    { queryKey: ['entertainment', 'entertainment'], queryFn: () => fetchNews('entertainment') }
  ]);

  const error = cats.some(obj => obj.error);
  const isLoading = cats.some(obj => obj.isLoading);

  if (isLoading) {
    return <h1 className='loading'>Loading...</h1>
  }
  if (error) {
    return <h1 className='error'>Error: {error.message}</h1>
  }

  //cats is an array of objects. Each of those objects has a data property, which itself is an object pertinently
  //including the properties data, which is an array, and cat, which is its category.
  //Provided the first data property's cat property matches the category state, we map through and display its articles.

  return (
    <>
      <h1 id='top'><u>Top Stories</u></h1>
      <ul className='settings flex-wrapper'>
        <span onClick={() => setCategory('tech')}><li>Tech</li></span>
        <span onClick={() => setCategory('health')}><li>Health</li></span>
        <span onClick={() => setCategory('science')}><li>Science</li></span>
        <span onClick={() => setCategory('business')}><li>Business</li></span>
        <span onClick={() => setCategory('entertainment')}><li>Entertainment</li></span>
      </ul>
      <a href='/' onClick={e => {
        let top = document.getElementById('top');
        e.preventDefault();
        top && top.scrollIntoView({ behavior: "smooth" });
      }}>
        <img onMouseOver={() => setArrow('./up-arrow-filled.png')} onMouseLeave={() => setArrow('./up-arrow.png')} className='scrolltop' src={arrow} />
      </a>
      {
        cats.filter(catObj => catObj.data.cat === category)[0].data.data.map(article => {
          if (article.title && article.image_url && article.source) {
            return (
              <figure key={article.uuid} className='article-flex-wrapper'>
                <a target='__blank' href={article.url}>
                  <h2 className='headline'>{article.title}</h2>
                  <img className='news-img' src={article.image_url} />
                </a>
                <text className='article-source'>— {article.source}</text>
                <hr />
              </figure>
            );
          }
        })
      }
    </>
  );
}