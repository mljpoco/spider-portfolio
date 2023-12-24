import { useQuery } from 'react-query';
import axios from 'axios';

async function fetchNews() {
	const res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=9078a681190b472aa41e2074e0df4fee');
	return res.data;
}

export default function News() {

	const { data: newsObject, error, isLoading } = useQuery('articlesData', fetchNews);

	if (isLoading) {
		return <figure>Loading...</figure>
	}
	if (error) {
		return <figure>Error: {error.message}</figure>
	}

	return (
		<>
			{
				newsObject.articles.map(article => {
					if (article.title !== '[Removed]') {
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