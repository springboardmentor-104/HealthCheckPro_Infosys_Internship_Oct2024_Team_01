import { useEffect, useState } from 'react';
import {
    Box,
    Text,
    Button,
    HStack,
    Progress,
    Image,
    Grid,
    useBreakpointValue,
    VStack,
    IconButton,
    Skeleton,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons';

import questionBg from '../assets/question.png';
import SectionSteps from '../components/SectionSteps';
import useCustomTheme from '../hooks/useCustomTheme';
import useCategory from '../hooks/useCategory';
import useAssessment from '../hooks/useAssessment';
import { Link } from 'react-router-dom';

const TestPortal = () => {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const { fetchCategories, fetchQuestionsByCategory, loadingQuestions, loadingCategories } = useCategory();
    const { submitCategoryAssessment,fetchAssessmentStatus } = useAssessment();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAssessmentStatus = async () => {
            const data = await fetchAssessmentStatus();
            if (data) {
                console.log('=== data TestPortal.jsx [64] ===', data);
                if (data.isComplete) {
                    setIsQuizCompleted(true);
                }
                else{
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

    // const handlePreviousQuestion = () => {
    //     if (currentQuestionIndex > 0) {
    //         setCurrentQuestionIndex(currentQuestionIndex - 1);
    //         setSelectedAnswer('');
    //     } else if (currentCategoryIndex > 0) {
    //         setCurrentCategoryIndex(currentCategoryIndex - 1);
    //         setCurrentQuestionIndex(categories[currentCategoryIndex - 1].length - 1);
    //         setSelectedAnswer('');
    //     }
    // };

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
        })

    };

    const StackComponent = useBreakpointValue({ base: Grid, md: HStack });

    if (isQuizCompleted) {
        return (
            <Box mt={20} w="100%" minH="100vh" p={6} display="flex" justifyContent="center" alignItems="center">
                <Text fontSize="2xl" fontWeight="bold">Quiz Completed! Thank you for participating.</Text>
                <Button as={Link} to="/dashboard">Go to Dashboard</Button>
            </Box>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
            <Progress colorScheme="blue" size="md" w="100%" value={(currentQuestionIndex + 1) / questions.length * 100} />
            <Box mx="auto" w="80%" display="flex" justifyContent="center" h="100svh">
                <StackComponent borderRadius="md" p={6} position="relative">
                    <Box>
                        <SectionSteps loadingCategories={loadingCategories} currentCategoryIndex={currentCategoryIndex} categories={categories} />
                    </Box>

                    <VStack>
                        <StackComponent w="100%" gap={20}>
                            <Text display={{ base: "none", md: "block" }} w="100%" color="blue.500" fontSize="lg" fontWeight="bold" textAlign="right">
                                QUESTION {currentQuestionIndex + 1}/{questions.length}
                            </Text>
                            <HStack display={{
                                base: "flex",
                                md: "none"
                            }}>

                                <Text flex={1} color="blue.500" fontSize="lg" fontWeight="bold" textAlign="center">
                                    QUESTION {currentQuestionIndex + 1}/{questions.length}
                                </Text>
                                <IconButton
                                    colorScheme="blue"
                                    size="lg"
                                    onClick={handleNextQuestion}
                                    disabled={!selectedAnswer}
                                    icon={currentCategoryIndex === categories.length - 1 && currentQuestionIndex === questions.length - 1 ? <CheckIcon /> : <ArrowForwardIcon />}
                                    aria-label="Next Question"
                                />
                            </HStack>
                        </StackComponent>
                        <Skeleton isLoaded={
                            !loadingQuestions
                        }><Text w="100%" textAlign={{
                            base: "center",
                            md: "left"
                        }} fontSize="2xl" fontWeight="bold" my={6}>
                                {currentQuestion && currentQuestion.questionText}
                            </Text></Skeleton>
                        <HStack w="100%" gap={10} position="relative">
                            <Box w={{ base: "100%", md: "50%" }} mb={4} display={{ base: "none", md: "flex" }}
                                justifyContent="center">
                                <Image src={questionBg} alt="Illustration" width="full" />
                            </Box>
                            <Grid h="100%" mt={4} gap={4} w="100%" zIndex={2}>
                                {currentQuestion && currentQuestion.options.map((option, index) => (
                                    <Skeleton isLoaded={!loadingQuestions} key={index}>
                                        <Button
                                            onClick={() => handleOptionSelect(option.optionText, currentQuestion._id)}
                                            colorScheme="blue"
                                            variant={selectedAnswer === option.optionText ? 'solid' : 'outline'}
                                            size="lg"
                                            w="100%"
                                            mr={2}
                                            boxShadow={selectedAnswer === option.optionText ? 'lg' : 'md'}
                                        >
                                            {option.optionText}
                                        </Button>
                                    </Skeleton>
                                ))}
                            </Grid>
                            <Image
                                src={questionBg}
                                alt="Illustration"
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                width="80%"
                                opacity={0.1}
                                display={{ base: "block", md: "none" }}
                            />
                        </HStack>
                        <HStack justify="flex-end" mt={8} width="100%" display={{ base: "none", md: "flex" }}>
                            <Button colorScheme="blue" size="lg" onClick={handleNextQuestion} disabled={!selectedAnswer || loading} isLoading={loading}>
                                {currentCategoryIndex === categories.length - 1 && currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </HStack>
                    </VStack>
                </StackComponent>
            </Box>
        </>
    );
};

export default TestPortal;