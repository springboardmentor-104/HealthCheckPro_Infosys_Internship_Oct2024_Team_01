import { CheckIcon } from '@chakra-ui/icons';
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
import { MH2 } from '../../assets/illustrations';

const MobileView = ({
    currentQuestionIndex,
    questions,
    currentCategoryIndex,
    categories,
    selectedAnswer,
    loadingCategories,
    handleNextQuestion,
    loadingQuestions,
    currentQuestion,
    handleOptionSelect,
    loading,
}) => {
    return (
        <Box w="100%" minH="100vh" overflow="hidden">
            <Progress colorScheme="blue" size="md" w="100%" value={(currentQuestionIndex + 1) / questions.length * 100} />
            <Box mx="auto" w="90%" display="flex" justifyContent="center" h="100vh" overflowY="auto">
                <Grid borderRadius="md" p={4} position="relative" w="100%">
                    <Box mb={4}>
                        <SectionSteps loadingCategories={loadingCategories} currentCategoryIndex={currentCategoryIndex} categories={categories} />
                    </Box>

                    <VStack spacing={6}>
                        <Grid w="100%" gap={4}>
                            <HStack justify="center">
                                <Text flex={1} color="blue.500" fontSize="lg" fontWeight="bold" textAlign="center">
                                    QUESTION {currentQuestionIndex + 1}/{questions.length}
                                </Text>
                            </HStack>
                        </Grid>
                        <Skeleton isLoaded={!loadingQuestions}>
                            <Text w="100%" textAlign="center" fontSize="xl" fontWeight="bold" my={4}>
                                {currentQuestion && currentQuestion.questionText}
                            </Text>
                        </Skeleton>
                        <VStack w="100%" spacing={4} position="relative" >
                            <Grid h="100%" gap={4} w="100%" zIndex={2}>
                                {currentQuestion && currentQuestion.options.map((option, index) => (
                                    <Skeleton isLoaded={!loadingQuestions} key={index}>
                                        <Button
                                            onClick={() => handleOptionSelect(option.optionText, currentQuestion._id)}
                                            colorScheme="blue"
                                            variant={selectedAnswer === option.optionText ? 'solid' : 'outline'}
                                            size="md"
                                            w="100%"
                                            boxShadow={selectedAnswer === option.optionText ? 'lg' : 'md'}
                                        >
                                            {option.optionText}
                                        </Button>
                                    </Skeleton>
                                ))}
                            </Grid>
                            <Image
                                src={MH2}
                                alt="Illustration"
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                width="80%"
                                opacity={0.1}
                                display={{ base: "block", md: "none" }}
                            />
                        </VStack>
                        <Button
                            colorScheme="blue"
                            size="lg"
                            onClick={handleNextQuestion}
                            disabled={!selectedAnswer || loading}
                            isLoading={loading}
                        >
                            {currentCategoryIndex === categories.length - 1 && currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </VStack>
                </Grid>
            </Box>
        </Box>
    );
};

export default MobileView;