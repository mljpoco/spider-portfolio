import { useState } from 'react';
import { useQueries } from 'react-query';
import axios from 'axios';

async function fetchNews(cat) {
	const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=9078a681190b472aa41e2074e0df4fee`);
	res.data.cat = cat;
	return res.data;
}

export default function News() {

	const [category, setCategory] = useState('technology');

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
			<h1><u>Top US Headlines</u></h1>
			<ul className='categories'>
				<span onClick={() => setCategory('technology')}><li>Tech</li></span>
				<span onClick={() => setCategory('health')}><li>Health</li></span>
				<span onClick={() => setCategory('science')}><li>Science</li></span>
				<span onClick={() => setCategory('business')}><li>Business</li></span>
				<span onClick={() => setCategory('entertainment')}><li>Entertainment</li></span>
			</ul>

			{
				cats.filter(catObj => catObj.data.cat === category)[0].data.articles.map(article => {
					if (article.title !== '[Removed]' && article.urlToImage) {
						return (
							<figure key={article.description} className='article-flex-wrapper'>
								<a target='__blank' href={article.url}>
									<h2 className='headline'>{article.title}</h2>
									<img className='news-img' src={article.urlToImage} />
								</a>
								<text className='news-source'>— {article.source.name}</text>
								<hr />
							</figure>
						);
					}
				})
			}
		</>
	);
}