import {
    Box,
    Text,
    Button,
    HStack,
    VStack,
    Progress,
    Image,
    Grid,
    useBreakpointValue,
} from '@chakra-ui/react';

import { useState } from 'react';
import questionBg from '../assets/question.png';
import SectionSteps from './SectionSteps';

import useCustomTheme from '../hooks/useCustomTheme';

const Question = () => {

    const {cardBg} = useCustomTheme();

    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleNextQuestion = () => {
        console.log(selectedAnswer);
    }

    const StackComponent = useBreakpointValue({ base: Grid, md: HStack });

    return (
        <Box mt={20} w="100%" minH="100vh" p={6} display="flex" justifyContent="center" alignItems="center">
            <Box bg={cardBg} borderRadius="md" p={6} position="relative">
                <Box width="100%" overflowX="auto"><SectionSteps/></Box>
                <Box mb={10}/>
                <StackComponent w="100%"  gap={2}>
                    {/* Progress Bar */}
                    <Progress w="full" colorScheme="blue" size="md" flex={1} value={20} border="1px" borderColor="blue.500" rounded="full" />

                    {/* Question Number */}
                    <Text color="blue.500" fontSize="lg" fontWeight="bold" textAlign="right">
                        QUESTION 1/5
                    </Text>
                </StackComponent>

                {/* Question Text */}
                <Text fontSize="2xl" fontWeight="bold" m={6}>
                    Which former British colony was given back to China in 1997?
                </Text>

                <HStack w="100%" gap={10} position="relative">
                    {/* Illustration Image */}
                    <Box
                        w={{ base: "100%", md: "50%" }}
                        mb={4}
                        display={{ base: "none", md: "flex" }}
                        justifyContent="center"
                    >
                        <Image
                            src={questionBg}
                            alt="Illustration"
                            width="full"
                        />
                    </Box>

                    {/* Answer Options */}
                    <Grid mt={4} gap={4} w="100%">
                        <Button
                            onClick={() => setSelectedAnswer('Russia')}
                            colorScheme={selectedAnswer === 'Russia' ? 'blue' : 'gray'}
                            size="lg"
                            w="100%"
                            mr={2}
                        >
                            Russia
                        </Button>
                        <Button
                            onClick={() => setSelectedAnswer('America')}
                            colorScheme={selectedAnswer === 'America' ? 'blue' : 'gray'}
                            size="lg"
                            w="100%"
                            mr={2}
                        >
                            America
                        </Button>
                        <Button
                            onClick={() => setSelectedAnswer('Australia')}
                            colorScheme={selectedAnswer === 'Australia' ? 'blue' : 'gray'}
                            size="lg"
                            w="100%"
                            mr={2}
                        >
                            Australia
                        </Button>
                        <Button
                            onClick={() => setSelectedAnswer('Hong Kong')}
                            colorScheme={selectedAnswer === 'Hong Kong' ? 'blue' : 'gray'}
                            size="lg"
                            w="100%"
                        >
                            Hong Kong
                        </Button>
                    </Grid>

                    {/* Mobile Illustration Image */}
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

                {/* Navigation Buttons */}
                <HStack justify="space-between" mt={8}>
                    <Button colorScheme="gray" size="lg">Previous</Button>
                    <Button colorScheme="blue" size="lg" onClick={handleNextQuestion}>
                        Next Question
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
}

export default Question;