import { useState, useEffect } from 'react';
import { useQueries } from 'react-query';
import axios from 'axios';

async function fetchNews(cat) {
	const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=9078a681190b472aa41e2074e0df4fee`);
	res.data.cat = cat;
	return res.data;
}

export default function News() {

	const [category, setCategory] = useState(JSON.parse(localStorage.getItem('category')) || 'technology');
	const [arrow, setArrow] = useState('./up-arrow.png')

	useEffect(() => {
		localStorage.setItem('category', JSON.stringify(category));
	}, [category]);

	const cats = useQueries([
		{ queryKey: ['tech', 'technology'], queryFn: () => fetchNews('technology') },
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
	//including the properties articles, which is an array, and cat, which is its category.
	//Provided that data property's cat property matches the category state, we map through and display its articles.

	return (
		<>
			<h1 id='top'><u>Top US Headlines</u></h1>
			<ul className='settings flex-wrapper'>
				<span onClick={() => setCategory('technology')}><li>Tech</li></span>
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
				cats.filter(catObj => catObj.data.cat === category)[0].data.articles.map(article => {
					if (article.title !== '[Removed]' && article.urlToImage && article.author) {
						return (
							<figure key={article.description} className='article-flex-wrapper'>
								<a target='__blank' href={article.url}>
									<h2 className='headline'>{article.title}</h2>
									<img className='news-img' src={article.urlToImage} />
								</a>
								<text className='article-author'>— {article.author}</text>
								<hr />
							</figure>
						);
					}
				})
			}
		</>
	);
}