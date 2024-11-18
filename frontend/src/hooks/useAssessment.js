import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import useGlobalState from '../hooks/useGlobalState';

const useAssessment = () => {
    const [assessmentStatus, setAssessmentStatus] = useState(null);
    const [assessmentHistory, setAssessmentHistory] = useState([]);
    const [latestAssessment, setLatestAssessment] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();
    const { user } = useGlobalState();

    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });

    const fetchAssessmentStatus = async () => {
        try {
            const response = await axiosInstance.get('/api/assessment/status');
            console.log('=== response useAssessment.js [24] ===', response);
            return response.data;
        } catch (error) {
            toast({
                title: 'Error fetching assessment status!',
                status: 'error',
                description: error.response.data.message,
                duration: 3000,
                isClosable: true,
            });

            console.error('Error fetching assessment status:', error);
        }
    };

    const fetchAssessmentHistory = async () => {
        try {
            const response = await axiosInstance.get('/api/assessment/all-attempts');
            return response.data.allAttempts;
        } catch (error) {
            console.error('Error fetching assessment history:', error);
        }
    };

    const fetchLatestAssessment = async () => {
        try {
            const response = await axiosInstance.get('/api/assessment/latest-attempt');
            return response.data;
        } catch (error) {
            console.error('Error fetching latest assessment:', error);
        }
    };

    const startNewRound = async () => {
        try {
            const res = await axiosInstance.post('/api/assessment/start-new-round');
            res && toast({
                title: 'New round started!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });


            res && navigate(`/assessment/attempt/${res.data.attempt._id}}`);
        } catch (error) {
            toast({
                title: 'Error starting new round!',
                status: 'error',
                description: error.response.data.message,
                duration: 3000,
                isClosable: true,
            });
            console.error('Error starting new round:', error);
        }
    };

    const submitCategoryAssessment = async (categoryId,categoryName, questions) => {
        try {
            const response = await axiosInstance.patch('/api/assessment/submit', { categoryId,categoryName, questions });
            response && toast({
                title: 'Assessment submitted successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            return response.data;
        } catch (error) {
            toast({
                title: 'Error submitting assessment!',
                status: 'error',
                description: error.response.data.message,
                duration: 3000,
                isClosable: true,
            });
            console.error('Error submitting assessment:', error);
        }
    };

    // useEffect(() => {
    //     fetchAssessmentStatus();
    //     fetchAssessmentHistory();
    //     fetchLatestAssessment();
    // }, []);

    return {
        assessmentStatus,
        assessmentHistory,
        latestAssessment,
        fetchAssessmentStatus,
        fetchAssessmentHistory,
        fetchLatestAssessment,
        startNewRound,
        submitCategoryAssessment,
    };
};

export default useAssessment;
