import { useBreakpointValue } from '@chakra-ui/react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAssessment from '../apis/assessment';
import useCategory from '../apis/category';
import DesktopView from '../components/test_portal/DesktopView';
import MobileView from '../components/test_portal/MobileView';
import { MH2,N1,
    P1,
    L1,
    BM1
 } from '../assets/illustrations';

const TestPortal = () => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const { fetchCategories, fetchQuestionsByCategory, loadingQuestions, loadingCategories } = useCategory();
    const { submitCategoryAssessment, fetchAssessmentStatus } = useAssessment();
    const [loading, setLoading] = useState(false);
    const images = [MH2, N1,P1,L1,BM1]; // Add more images as needed

    useEffect(() => {
        const getAssessmentStatus = async () => {
            const data = await fetchAssessmentStatus();
            if (data) {
                console.log('=== data TestPortal.jsx [64] ===', data);
                if (data.isComplete) {
                    setIsQuizCompleted(true);
                }
                else {
                    setCurrentCategoryIndex(data.completedCategories.length);
                }
            }
        };
        getAssessmentStatus();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            if (data) {
                setCategories(data);
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getQuestions = async () => {
            if (categories[currentCategoryIndex]?._id) {
                const data = await fetchQuestionsByCategory(categories[currentCategoryIndex]._id);
                if (data) {
                    setQuestions(data);
                }
            }
        };
        if (categories.length > 0) {
            getQuestions();
        }
    }, [categories, currentCategoryIndex]);

    const handleNextQuestion = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
        } else {
            await handleSubmit();
            if (currentCategoryIndex < categories.length - 1) {
                setCurrentCategoryIndex((prev) => prev + 1);
                setCurrentQuestionIndex(0);
                setSelectedAnswer('');
            } else {
                setIsQuizCompleted(true);
            }
        }
    };

    const handleOptionSelect = (optionText, questionId) => {
        setSelectedAnswer(optionText);
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: optionText,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const categoryId = categories[currentCategoryIndex]._id;
        const categoryName = categories[currentCategoryIndex].categoryName;
        const questionsToSubmit = questions.map((question) => ({
            questionId: question._id,
            selectedOptionId: question.options.find(option => option.optionText === selectedOptions[question._id])._id,
        }));

        await submitCategoryAssessment(categoryId, categoryName, questionsToSubmit)
            .finally(() => {
                setLoading(false);
            });
    };

    const isMobile = useBreakpointValue({ base: true, md: false });

    if (isQuizCompleted) {
        return (
            <Box mt={20} w="100%" minH="100vh" p={6} display="flex" justifyContent="center" alignItems="center">
                <Text fontSize="2xl" fontWeight="bold">Quiz Completed! Thank you for participating.</Text>
                <Button as={Link} to="/dashboard">Go to Dashboard</Button>
            </Box>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return isMobile ? (
        <MobileView
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            currentCategoryIndex={currentCategoryIndex}
            categories={categories}
            selectedAnswer={selectedAnswer}
            loadingCategories={loadingCategories}
            handleNextQuestion={handleNextQuestion}
            loadingQuestions={loadingQuestions}
            currentQuestion={currentQuestion}
            handleOptionSelect={handleOptionSelect}
            loading={loading}
            images={images}
        />
    ) : (
        <DesktopView
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            currentCategoryIndex={currentCategoryIndex}
            categories={categories}
            loadingCategories={loadingCategories}
            selectedAnswer={selectedAnswer}
            handleNextQuestion={handleNextQuestion}
            loadingQuestions={loadingQuestions}
            currentQuestion={currentQuestion}
            handleOptionSelect={handleOptionSelect}
            loading={loading}
            images={images}
        />
    );
};

export default TestPortal;