import axios from 'axios';
import { useEffect, useState } from 'react';

const useCategory = (token) => {
    const [error, setError] = useState(null);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(false);


    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const fetchCategories = async () => {
        setLoadingCategories(true);
        try {
            const response = await axiosInstance.get('/api/category');
            return response.data;
        } catch (error) {
            setError('Error fetching categories');
            console.error('Error fetching categories:', error);
        } finally {
            setLoadingCategories(false);
        }
    };

    const fetchQuestionsByCategory = async (categoryId) => {
        setLoadingQuestions(true);
        try {
            const response = await axiosInstance.get(`/api/category/${categoryId}/questions`);
            return response.data;
        } catch (error) {
            setError('Error fetching questions');
            console.error('Error fetching questions:', error);
        } finally {
            setLoadingQuestions(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        error,
        fetchCategories,
        fetchQuestionsByCategory,
        loadingCategories,
        loadingQuestions,
    };
};

export default useCategory;