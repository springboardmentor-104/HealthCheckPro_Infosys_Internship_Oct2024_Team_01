import { useBreakpointValue } from '@chakra-ui/react';
import {
    Box, Button, Text, Progress, HStack, VStack, Grid, Skeleton, Image, CircularProgress,
    Alert, AlertTitle
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAssessment from '../apis/assessment';
import useCategory from '../apis/category';
import {
    MH2, N1,
    P1,
    L1,
    BM1
} from '../assets/illustrations';
import bg from '../../public/authbg.png';
import SectionSteps from '../components/SectionSteps';

const TestPortal = () => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showInstructions, setShowInstructions] = useState(true);
    const { fetchCategories, fetchQuestionsByCategory, loadingQuestions, loadingCategories } = useCategory();
    const { submitCategoryAssessment, fetchAssessmentStatus } = useAssessment();
    const [loading, setLoading] = useState(false);
    const images = [MH2, N1, P1, L1, BM1]; // Add more images as needed


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

    const handleProceedToTest = () => {
        setShowInstructions(false);
    };

    if (showInstructions) {
        return (
            <Box w="100%" h="100vh" p={6} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Text fontSize="2xl" fontWeight="bold" mb={4}>Welcome to the HealthCheckPro Assessment!</Text>
                <Text fontSize="lg" mb={2}>Here are some instructions to help you get started:</Text>
                <VStack align="start" spacing={2} mb={6}>
                    <Text fontSize="md">1. Answer each question to the best of your ability.</Text>
                    <Text fontSize="md">2. You can navigate through the questions using the "Next" button.</Text>
                    <Text fontSize="md">3. Once you complete all the questions, your health score and insights will be provided.</Text>
                    <Text fontSize="md">4. If you need to stop, you can continue the assessment later from where you left off.</Text>
                    <Alert status='warning' variant='subtle' flexDirection='column' alignItems='start' justifyContent='start' textAlign='start' w='100%'>
                        <AlertTitle fontSize='sm' fontWeight='bold'>
                            Note: If you are using mobile device, zoom out to see the full content.
                        </AlertTitle>
                    </Alert>

                </VStack>
                <Button colorScheme="blue" size="lg" onClick={handleProceedToTest}>Proceed to Test</Button>
            </Box>
        );
    }

    if (isQuizCompleted) {
        return (
            <Box
                mt={20}
                w="100%"
                h="100svh"
                p={6}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
            >
                <Image src={bg} alt="Quiz Completed" position="fixed" mx="auto" zIndex={-1} opacity={.1} />
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    Quiz Completed! Thank you for participating.
                </Text>
                <Button as={Link} to="/dashboard" colorScheme="blue">
                    Go to Dashboard
                </Button>
            </Box>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return questions.length > 0 && categories.length > 0 ? (
        <Box w="100%" minH="100vh">

            <Progress pos="fixed" top={0} colorScheme="blue" size="md" w="100%" value={(currentQuestionIndex + 1) / questions.length * 100} />

            <Box mx="auto" w={{
                base: '100%',
                md: '80%'
            }} display="flex" justifyContent="center" alignItems={{ md: "center" }} h="100vh">
                <Box w={{ base: "100%", md: "auto" }} display="flex" flexDirection={{
                    base: 'column',
                    md: 'row'
                }} borderRadius="md" p={6} position="relative">
                    <Box w={{
                        base: '100%',
                        md: 'auto'
                    }}
                    my={{md:"auto"}}
                    >
                        <SectionSteps loadingCategories={loadingCategories} currentCategoryIndex={currentCategoryIndex} categories={categories} />
                    </Box>

                    <VStack>
                        <HStack w="100%" gap={20}>
                            <Text w="100%" color="blue.500" fontSize="lg" fontWeight="bold" textAlign={{
                                base: 'center',
                                md: 'right'
                            }}>
                                <Skeleton isLoaded={!loadingQuestions}>
                                    QUESTION {currentQuestionIndex + 1}/{questions.length}
                                </Skeleton>
                            </Text>
                        </HStack>
                        <Skeleton isLoaded={!loadingQuestions}>
                            <Text w="100%" textAlign="left" fontSize="2xl" fontWeight="bold" my={6}>
                                {currentQuestion && currentQuestion.questionText}
                            </Text>
                        </Skeleton>
                        <HStack w="100%" gap={{
                            base: 0,
                            md: 10
                        }} position="relative">
                            <Box pos={{
                                base: 'fixed',
                                md: 'static'
                            }} w={{md:"50%"}} top={0} mb={4} display="flex" justifyContent="center" opacity={{
                                base: 0.1,
                                md: 1
                            }}>
                                <Skeleton isLoaded={!loadingQuestions}>
                                    <Image src={images[currentCategoryIndex]} alt="Illustration" width="full" />
                                </Skeleton>
                            </Box>
                            <Grid h="100%" mt={4} gap={4} w={{ base: "100svw", md: "100%" }} overflowX={{
                                base: 'auto',
                                md: 'hidden'
                            }} zIndex={2}>
                                {currentQuestion && currentQuestion.options.map((option, index) => (
                                    <Skeleton isLoaded={!loadingQuestions}key={index} >
                                    <Button
                                        onClick={() => handleOptionSelect(option.optionText, currentQuestion._id)}
                                        colorScheme="blue"
                                        variant={selectedAnswer === option.optionText ? 'solid' : 'outline'}
                                        size="lg"
                                        w="100%"

                                        boxShadow={selectedAnswer === option.optionText ? 'lg' : 'md'}
                                    >
                                            {option.optionText}
                                    </Button>
                                        </Skeleton>
                                ))}
                            </Grid>
                        </HStack>
                        <HStack justify="flex-end" my={8} width="100%">
                            <Button colorScheme="blue" size="lg" onClick={handleNextQuestion} disabled={!selectedAnswer || loading} isLoading={loading}>
                                {currentCategoryIndex === categories.length - 1 && currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Box>
        </Box>
    ) : (
        <Box
            mt={20}
            w="100%"
            minH="100vh"
            p={6}
            display="flex"
            gap={2}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Image src={bg} alt="Quiz Completed" position="fixed" mx="auto" zIndex={-1} opacity={.1} />
            <CircularProgress isIndeterminate color='blue.300' />

        </Box>
    )
};

export default TestPortal;