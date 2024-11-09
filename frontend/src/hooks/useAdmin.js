import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/categories');
            return response.data;
        } catch (err) {
            setError(err);
            toast({
                title: "Error fetching categories.",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchQuestionsByCategory = async (categoryId) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/admin/questions/${categoryId}`);

            return response.data;

        } catch (err) {
            setError(err);

        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (categoryData) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/admin/add-category', categoryData);

            toast({
                title: "Category added successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            setError(err);
            toast({
                title: "Error adding category.",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/admin/delete-category/${id}`);
            toast({
                title: "Category deleted successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            setError(err);
            toast({
                title: "Error deleting category.",
                description: err.response.data.error,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };



    const addQuestion = async (questionData) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/admin/add-question', questionData);

            toast({
                title: "Question added successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            setError(err);
            toast({
                title: "Error adding question.",
                description: err.response.data.error,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.log('=== err useAdmin.js [107] ===', err);
        } finally {
            setLoading(false);
        }
    };

    const modifyQuestion = async (id, questionData) => {
        setLoading(true);
        try {
            await axios.put(`/api/admin/modify-question/${id}`, questionData);

            toast({
                title: "Question modified successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            setError(err);
            toast({
                title: "Error modifying question.",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteQuestion = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/admin/delete-question/${id}`);

            toast({
                title: "Question deleted successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            setError(err);
            toast({
                title: "Error deleting question.",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return {

        loading,
        error,
        fetchCategories,
        fetchQuestionsByCategory,
        addCategory,
        addQuestion,
        modifyQuestion,
        deleteQuestion,
        deleteCategory
    };
};

export default useAdmin;