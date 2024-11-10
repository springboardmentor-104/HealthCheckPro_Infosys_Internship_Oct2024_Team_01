import { useState, useEffect } from 'react';
import axios from 'axios';


const useAssessment = () => {
    const [assessmentStatus, setAssessmentStatus] = useState(null);
    const [assessmentHistory, setAssessmentHistory] = useState([]);
    const [latestAssessment, setLatestAssessment] = useState(null);

    const fetchAssessmentStatus = async () => {
        try {
            const response = await axios.get('/api/assessment/status');
            setAssessmentStatus(response.data);
        } catch (error) {
            console.error('Error fetching assessment status:', error);
        }
    };

    const fetchAssessmentHistory = async () => {
        try {
            const response = await axios.get('/api/assessment/history');
            setAssessmentHistory(response.data.allAttempts);
        } catch (error) {
            console.error('Error fetching assessment history:', error);
        }
    };

    const fetchLatestAssessment = async () => {
        try {
            const response = await axios.get('/api/assessment/latest');
            setLatestAssessment(response.data);
        } catch (error) {
            console.error('Error fetching latest assessment:', error);
        }
    };

    useEffect(() => {
        fetchAssessmentStatus();
        fetchAssessmentHistory();
        fetchLatestAssessment();
    }, []);

    return {
        assessmentStatus,
        assessmentHistory,
        latestAssessment,
        fetchAssessmentStatus,
        fetchAssessmentHistory,
        fetchLatestAssessment
    };
};



export default useAssessment