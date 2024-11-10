import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            setError('Error fetching categories');
            console.error('Error fetching categories:', error);
        }
    };

    const fetchQuestionsByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`/api/categories/${categoryId}/questions`);
            setQuestions(response.data);
        } catch (error) {
            setError('Error fetching questions');
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        questions,
        error,
        fetchCategories,
        fetchQuestionsByCategory
    };
};

export default useCategory;