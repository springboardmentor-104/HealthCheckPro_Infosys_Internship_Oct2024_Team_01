import {
    Box,
    Button,
    Grid,
    HStack,
    Image,
    Progress,
    Skeleton,
    Text,
    VStack,
} from '@chakra-ui/react';

import SectionSteps from '../SectionSteps';

const DesktopView = ({
    currentQuestionIndex,
    questions,
    currentCategoryIndex,
    categories,
    loadingCategories,
    selectedAnswer,
    handleNextQuestion,
    loadingQuestions,
    currentQuestion,
    handleOptionSelect,
    loading,
    images
}) => {
    return (
        <Box w="100%" minH="100vh">
            <Skeleton isLoaded={!loadingCategories}>
                <Progress colorScheme="blue" size="md" w="100%" value={(currentQuestionIndex + 1) / questions.length * 100} />
            </Skeleton>
            <Box mx="auto" w="80%" display="flex" justifyContent="center" h="100vh">
                <HStack borderRadius="md" p={6} position="relative">
                    <Box>
                        <SectionSteps loadingCategories={loadingCategories} currentCategoryIndex={currentCategoryIndex} categories={categories} />
                    </Box>

                    <VStack>
                        <HStack w="100%" gap={20}>
                            <Skeleton isLoaded={!loadingQuestions}>
                                <Text w="100%" color="blue.500" fontSize="lg" fontWeight="bold" textAlign="right">
                                    QUESTION {currentQuestionIndex + 1}/{questions.length}
                                </Text>
                            </Skeleton>
                        </HStack>
                        <Skeleton isLoaded={!loadingQuestions}>
                            <Text w="100%" textAlign="left" fontSize="2xl" fontWeight="bold" my={6}>
                                {currentQuestion && currentQuestion.questionText}
                            </Text>
                        </Skeleton>
                        <HStack w="100%" gap={10} position="relative">
                            <Box w="50%" mb={4} display="flex" justifyContent="center">
                                <Skeleton isLoaded={!loadingQuestions}>
                                    <Image src={images[currentCategoryIndex]} alt="Illustration" width="full" />
                                </Skeleton>
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
                        </HStack>
                        <HStack justify="flex-end" mt={8} width="100%">
                            <Button colorScheme="blue" size="lg" onClick={handleNextQuestion} disabled={!selectedAnswer || loading} isLoading={loading}>
                                {currentCategoryIndex === categories.length - 1 && currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
        </Box>
    );
};

export default DesktopView;
