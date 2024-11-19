import {
    Box,
    Button,
    Center,
    Flex, Heading,
    HStack,
    Progress,
    Stack,
    Table,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    VStack,
    Image
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { Skeleton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/react';

import useAssessment from '../../hooks/useAssessment';
import useCustomTheme from '../../hooks/useCustomTheme';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts'

import image from '../../assets/Doctor-removebg-preview_enhanced.png';

const PendingAssessment = ({ status, latestAttempt, cardBg, history, startNewRound }) => {


    const handleStartRound = async () => {
        await startNewRound();
    }

    if (!status) {
        return (
            <Box bgColor={cardBg} p={5} rounded="md">
                <Skeleton height="20px" mb={4} />
                <Skeleton height="20px" mb={4} />
                <Skeleton height="20px" mb={4} />
            </Box>
        );
    }

    console.log('=== latestAttempt UserStatusUI.jsx [21] ===', latestAttempt);

    const handleRedirect = () => {
        history(`/assessment/attempt/${latestAttempt._id}`);
    }


    return !status.isComplete ? (
        <Box bgColor={cardBg} p={5} rounded="md">
            <Flex justify="space-between">

                <HStack gap={5} w="full" justify="flex-end">
                    <Tag colorScheme="red">Attempt Number: {status.attemptNumber}</Tag>
                </HStack>
            </Flex>
            <VStack mt={5} gap={5} p={5}>
                <Box>
                    <Heading size="md">Completed Categories</Heading>
                    {status.completedCategories.length > 0 ? (
                        status.completedCategories.map((category, index) => (
                            <Tag key={index} colorScheme="red" m={1}>
                                {category.categoryName}
                            </Tag>
                        ))
                    ) : (
                        <Text>No categories completed yet.</Text>
                    )}
                </Box>
                {!status.isComplete && (
                    <Button colorScheme="red" onClick={handleRedirect}>
                        Continue Assessment
                    </Button>
                )}
            </VStack>
        </Box>
    ) : (<Flex w="100%" h={"300px"} alignItems="center">
        <Button mt={5} mx="auto" colorScheme="blue" size="lg" onClick={handleStartRound}>
            Start New Round
        </Button>
    </Flex>)
}


const LatestAttemptUI = ({ latestCompleteAttempt, cardBg }) => {
    if (!latestCompleteAttempt) {
        return null;
    }

    const healthStatus = (score, tot) => {
        const percentage = Math.floor((score / tot) * 100);
        let bgColor, emoji, statusText;

        if (percentage >= 90) {
            bgColor = 'green.100';
            emoji = '🌟';
            statusText = 'Outstanding';
        } else if (percentage >= 75) {
            bgColor = 'green.200';
            emoji = '😃';
            statusText = 'Excellent';
        } else if (percentage >= 60) {
            bgColor = 'yellow.100';
            emoji = '🙂';
            statusText = 'Good';
        } else if (percentage >= 40) {
            bgColor = 'orange.100';
            emoji = '😐';
            statusText = 'Fair';
        } else {
            bgColor = 'red.100';
            emoji = '😟';
            statusText = 'Needs Improvement';
        }

        return (
            <VStack
            bg={bgColor}
            p={5}
            rounded="md"
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="100%"
            gap={3}
            mb={5}
            >
            <Text fontSize="2xl" fontWeight="bold">
                {emoji} {statusText}
            </Text>
            <Text fontSize="lg">
                Health Score: {percentage}%
            </Text>
            </VStack>
        );
    };

    const suggestions = (score, tot) => {
        const percentage = Math.floor((score / tot) * 100);
        if (percentage >= 90) {
            return 'Keep up the good work! You are doing great. Your health is in excellent condition.';
        } else if (percentage >= 75) {
            return 'Great job! You are doing well. Keep up the good work.';
        } else if (percentage >= 60) {
            return 'Good job! You are doing well. Keep up the good work.';
        } else if (percentage >= 40) {
            return 'You are doing well. Keep up the good work.';
        } else {
            return 'You need to improve your health. Please consult a doctor for a health checkup.';
        }
    };

    return (
        <Box bgColor={cardBg} p={5} rounded="md" mt={5} >
            <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" alignItems="center" gap={3}>
                <Heading color="blue.600">
                    Health Report
                </Heading>
                <HStack gap={3}>
                    <Tag colorScheme="blue" variant="solid" size="lg">
                        Attempt Number: {latestCompleteAttempt.attemptNumber}
                    </Tag>
                    <Tag size="lg" variant="outline" colorScheme="blue">
                        Date: {new Date(latestCompleteAttempt.date).toLocaleDateString()}
                    </Tag>
                </HStack>
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }}  width="100%" h="100%" flex={1} mt={5} gap={5} p={5}>
                <SimpleGrid flex={1} position="relative" columns={[1, 2, 3]} gap={6}>
                    <CategoryCard category={{ categoryName: 'Overall', totalScore: latestCompleteAttempt.overallScore, maxScore: latestCompleteAttempt.overallMaxScore }} />
                    {latestCompleteAttempt.assessments.map((category, index) => (
                        <CategoryCard key={index} category={category} />
                    ))}
                </SimpleGrid>
            </Stack>

            <Box mt={10}>

                <Heading mb={5} size="lg" color="blue.600">Report Summary</Heading>


                {healthStatus(latestCompleteAttempt.overallScore, latestCompleteAttempt.overallMaxScore)}

                <Stack direction={{
                    base: 'column', md: 'row'
                }} p={5} bg="gray.50" rounded="md" boxShadow="md">
                    <Box flex={1} >

                        <Heading size="md" mb={3}>
                            Insights
                        </Heading>
                        <Text>
                            {suggestions(latestCompleteAttempt.overallScore, latestCompleteAttempt.overallMaxScore)}
                        </Text>
                    </Box>
                    <Box>
                        <Image src={image} w="200px" />
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

const CategoryCard = ({ category }) => {
    return (
        <Box boxShadow="lg" p={5} rounded="md" bg="white" >
            <Heading size="md" color="blue.600">{category.categoryName}</Heading>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={[
                            { name: 'Score', value: category.totalScore },
                            { name: 'Total', value: category.maxScore - category.totalScore }
                        ]}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        <Cell key={`cell-0`} fill="#3182CE" />
                        <Cell key={`cell-1`} fill="#E2E8F0" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            <Stack direction={{
                base: 'column', md: 'row'
            }} justifyContent="space-between" mt={5}>
                <Text color="blue.600">Total Score: {category.totalScore}</Text>
                <Text color="blue.600">Max Score: {category.maxScore}</Text>
            </Stack>
        </Box>
    );
};


const AssessmentHistory = ({ fetchAssessmentsHistory }) => {
    const [attempts, setAttempts] = useState([]);
    const { cardBg } = useCustomTheme();
    const isMobile = useBreakpointValue(
        { base: true, md: false }
    );

    useEffect(() => {
        const fetchHistory = async () => {
            const history = await fetchAssessmentsHistory();
            setAttempts(history.slice(1));
        }
        fetchHistory();

    }, []);

    return (
        <Box w="100%" h="500px" overflowY="auto" rounded="md" mt={5} p={5} bg={cardBg}>
            <Heading mb={5} color="blue.600">Assessment History</Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Attempt Number</Th>
                        <Th>Date</Th>
                        <Th>Overall Score</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {attempts.map((attempt) => (
                        <Tr key={attempt._id}>
                            <Td>{attempt.attemptNumber}</Td>
                            <Td>{new Date(attempt.date).toLocaleDateString()}</Td>
                            <Td>
                                <Box>
                                    <Stack direction={{
                                        base: 'column', md: 'row'
                                    }} justifyContent="space-between" mb={2}>
                                        <Text colorScheme="blue">Total - {attempt.overallScore}</Text>
                                        <Text colorScheme="blue">Max - {attempt.overallMaxScore}</Text>
                                    </Stack>
                                    <Progress value={attempt.overallScore} max={attempt.maxOverallScore} />
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};


const UserStatusUI = () => {
    const { fetchAssessmentStatus, fetchLatestAssessment, startNewRound, fetchAssessmentHistory } = useAssessment();
    const [status, setStatus] = useState(null);
    const [latestAssessment, setLatestAssessment] = useState(null);
    const { cardBg } = useCustomTheme();
    const history = useNavigate();


    useEffect(() => {
        const fetchStatus = async () => {
            const status = await fetchAssessmentStatus();
            console.log('=== status UserStatusUI.jsx [17] ===', status);
            setStatus(status);
        }
        fetchStatus();

        const fetchLatest = async () => {
            const latest = await fetchLatestAssessment();
            console.log('=== latest UserStatusUI.jsx [24] ===', latest);
            setLatestAssessment(latest);
        }
        fetchLatest();

    }, []);


    return (
        <Box w="100%" overflowX="hidden">
            {status?.attemptNumber > 0 ? (
                <>
                    <PendingAssessment status={status} latestAttempt={
                        latestAssessment?.latestIncompleteAttempt
                    } cardBg={cardBg} history={history} startNewRound={
                        startNewRound
                    } />
                    <LatestAttemptUI latestCompleteAttempt={latestAssessment?.latestCompleteAttempt} cardBg={cardBg} />
                    <AssessmentHistory fetchAssessmentsHistory={fetchAssessmentHistory} />
                </>
            ) : (<Flex w="100%" h={"300px"} alignItems="center">
                <Button mt={5} mx="auto" colorScheme="blue" size="lg" onClick={startNewRound}>
                    Start New Round
                </Button>
            </Flex>)}

        </Box>
    );

}

LatestAttemptUI.propTypes = {
    latestCompleteAttempt: PropTypes.shape({
        attemptNumber: PropTypes.number,
        date: PropTypes.string,
        overallScore: PropTypes.number,
        assessments: PropTypes.arrayOf(
            PropTypes.shape({
                categoryName: PropTypes.string,
                totalScore: PropTypes.number
            })
        )
    }),
    cardBg: PropTypes.string
};

AssessmentHistory.propTypes = {
    attempts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            attemptNumber: PropTypes.number,
            date: PropTypes.string,
            overallScore: PropTypes.number
        })
    )
};

PendingAssessment.propTypes = {
    status: PropTypes.shape({
        attemptNumber: PropTypes.number,
        completedCategories: PropTypes.arrayOf(
            PropTypes.shape({
                categoryName: PropTypes.string
            })
        ),
        isComplete: PropTypes.bool
    }),
    latestAttempt: PropTypes.shape({
        _id: PropTypes.string,
        isComplete: PropTypes.bool
    }),
    cardBg: PropTypes.string,
    history: PropTypes.func.isRequired
};

export default UserStatusUI;
