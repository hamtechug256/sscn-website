// This file contains utility functions for making API calls, possibly for fetching testimonials or news.

const API_BASE_URL = 'https://api.sorotinursing.ac.ug'; // Replace with your actual API base URL

export const fetchTestimonials = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
};

export const fetchNews = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/news`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};