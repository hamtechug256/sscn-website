import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/news'); // Adjust the API endpoint as needed
                setNewsArticles(response.data);
            } catch (error) {
                console.error('Error fetching news articles:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-container">
            <h1 className="news-title">Latest News</h1>
            <div className="news-list">
                {newsArticles.length > 0 ? (
                    newsArticles.map((article) => (
                        <div key={article.id} className="news-article">
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-date">{new Date(article.date).toLocaleDateString()}</p>
                            <p className="article-excerpt">{article.excerpt}</p>
                            <a href={`/news/${article.id}`} className="read-more">Read More</a>
                        </div>
                    ))
                ) : (
                    <p>No news articles available at this time.</p>
                )}
            </div>
        </div>
    );
};

export default News;