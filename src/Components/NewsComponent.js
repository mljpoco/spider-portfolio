import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

async function fetchNews() {
	const res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=9078a681190b472aa41e2074e0df4fee');
	return res.data;
}

export default function News() {

	const [category, setCategory] = useState('technology');
	const { data: newsObject, error, isLoading } = useQuery('articlesData', fetchNews);

	if (isLoading) {
		return <h1 className='loading'>Loading...</h1>
	}
	if (error) {
		return <figure>Error: {error.message}</figure>
	}



	return (
		<>
			<h2><u>Top Headlines in the US</u></h2>
			<ul className='categories'>
				<span><li>Tech</li></span>
				<span><li>Health</li></span>
				<span><li>Science</li></span>
				<span><li>Business</li></span>
				<span><li>Entertainment</li></span>
				<hr />
			</ul>
			{
				newsObject.articles.map(article => {
					if (article.title !== '[Removed]' && article.urlToImage) {
						return (
							<figure key={article.description} className='article-flex-wrapper'>
								<h1>{article.title}</h1>
								<a target='__blank' href={article.url}>
									<img className='news-img' src={article.urlToImage} />
								</a>
								<text>— {article.source.name}</text>
								<hr />
							</figure>
						);
					}
				})
			}
		</>
	);

}