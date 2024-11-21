import {
    Box,
    Button,
    Flex, Heading,
    HStack,
    Image,
    Progress,
    Skeleton,
    Stack,
    Tag,
    Text,
    VStack
} from '@chakra-ui/react';
import { useEffect, useState, memo } from 'react';

import { SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer, Tooltip
} from 'recharts';
import useAssessment from '../../../apis/assessment';
import image from '../../../assets/doctor.png';
import useCustomTheme from '../../../hooks/useCustomTheme';

import { Link as ScrollLink } from 'react-scroll';


const UserStatusUI = () => {

    // Category card component
    const CategoryCard = memo(({ category }) => {
        return (
            <Box boxShadow="lg" p={5} rounded="md" bg={cardBg} >
                <Heading size="md" color="blue.600">{category.categoryName}</Heading>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={[
                                { name: 'Score', value: category.totalScore },
                                { name: 'Remaining', value: category.maxScore - category.totalScore }
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
                <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mt={5}>
                    <Text color="blue.600">Total Score: {category.totalScore}</Text>
                    <Text color="blue.600">Max Score: {category.maxScore}</Text>
                </Stack>
            </Box>
        );
    });

    CategoryCard.propTypes = {
        category: PropTypes.shape({
            categoryName: PropTypes.string,
            totalScore: PropTypes.number,
            maxScore: PropTypes.number
        })
    };

    CategoryCard.displayName = 'CategoryCard';
    // Hooks and state initialization

    const { fetchAssessmentStatus, fetchLatestAssessment, startNewRound, fetchAssessmentHistory } = useAssessment();
    const [status, setStatus] = useState(null);
    const [latestAssessment, setLatestAssessment] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cardBg, appLogo } = useCustomTheme();
    const history = useNavigate();

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const status = await fetchAssessmentStatus();
            // console.log('=== status UserStatusUI.jsx [17] ===', status);
            setStatus(status);

            const latest = await fetchLatestAssessment();
            // console.log('=== latest UserStatusUI.jsx [24] ===', latest);
            setLatestAssessment(latest);

            const history = await fetchAssessmentHistory();
            setAttempts(history.slice(1));

            setLoading(false);
        }
        fetchData();
    }, []);

    // Handle starting a new round
    const handleStartRound = async () => {
        await startNewRound();
    }

    // Handle redirect to assessment attempt
    const handleRedirect = () => {
        history(`/assessment/attempt/${latestAssessment?.latestIncompleteAttempt._id}`);
    }

    // Determine health status based on score
    const healthStatus = (score, tot) => {
        const percentage = Math.floor((score / tot) * 100);
        let bgColor, emoji, statusText;

        if (percentage >= 90) {
            bgColor = 'rgba(72, 187, 120, 0.2)'; // green.100
            emoji = '🌟';
            statusText = 'Outstanding';
        } else if (percentage >= 75) {
            bgColor = 'rgba(72, 187, 120, 0.4)'; // green.200
            emoji = '😃';
            statusText = 'Excellent';
        } else if (percentage >= 60) {
            bgColor = 'rgba(236, 201, 75, 0.2)'; // yellow.100
            emoji = '🙂';
            statusText = 'Good';
        } else if (percentage >= 40) {
            bgColor = 'rgba(237, 137, 54, 0.2)'; // orange.100
            emoji = '😐';
            statusText = 'Fair';
        } else {
            bgColor = 'rgba(245, 101, 101, 0.2)'; // red.100
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

    // Provide suggestions based on health score
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

    // Category card component

    return (
        <Box w="100%" >

            {status?.attemptNumber > 0 ? (
                <>
                    {!status.isComplete ? (
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
                    ) : (

                        <Box w="100%" p={5} bg={cardBg} rounded="md" boxShadow="lg" textAlign="center" mt={5}>
                            <Heading size="lg" color="blue.600" mb={3}>
                                Ready for a New Challenge?
                            </Heading>
                            <Text fontSize="md" mb={5}>
                                Start a new round to continue improving your health and track your progress.
                            </Text>
                            <Button colorScheme="blue" size="lg" onClick={handleStartRound}>
                                Start New Round
                            </Button>
                        </Box>
                    )}

                    {latestAssessment?.latestCompleteAttempt && (
                        <Box p={5} rounded="md" mt={5} >
                            <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" alignItems="center" gap={3}>
                                <Heading color="blue.600">
                                    Health Report
                                </Heading>
                                <Stack direction={{ base: 'column', md: 'row' }} gap={3}>

                                    <Button as={ScrollLink} to='report' smooth={true} duration={500} variant="ghost" size="sm" colorScheme="blue">View Suggestions</Button>

                                    <Tag colorScheme="blue" variant="solid" size="lg">
                                        Attempt Number: {latestAssessment.latestCompleteAttempt.attemptNumber}
                                    </Tag>
                                    <Tag size="lg" variant="outline" colorScheme="blue">
                                        Date: {new Date(latestAssessment.latestCompleteAttempt.date).toLocaleDateString()}
                                    </Tag>
                                </Stack>
                            </Stack>

                            <Stack direction={{ base: 'column', md: 'row' }} width="100%" h="100%" flex={1} mt={5} gap={5} >
                                <SimpleGrid flex={1} position="relative" columns={[1, 2, 3]} gap={6}>
                                    <Skeleton isLoaded={!loading}>
                                        <CategoryCard category={{ categoryName: 'Overall', totalScore: latestAssessment.latestCompleteAttempt.overallScore, maxScore: latestAssessment.latestCompleteAttempt.overallMaxScore }} />
                                    </Skeleton>
                                    {latestAssessment.latestCompleteAttempt.assessments.map((category, index) => (
                                        <Skeleton key={index} isLoaded={!loading}>
                                            <CategoryCard category={category} />
                                        </Skeleton>
                                    ))}
                                </SimpleGrid>
                            </Stack>

                            <Box mt={10} id='report'>
                                <Skeleton isLoaded={!loading}>
                                    <Heading mb={5} size="lg" color="blue.600">Report Summary</Heading>
                                    {healthStatus(latestAssessment.latestCompleteAttempt.overallScore, latestAssessment.latestCompleteAttempt.overallMaxScore)}
                                    <Stack direction={{ base: 'column', md: 'row' }} p={5} bg={cardBg} rounded="md" boxShadow="md">
                                        <Box flex={1}>
                                            <Heading size="md" mb={3}>
                                                Insights
                                            </Heading>
                                            <Text>
                                                {suggestions(latestAssessment.latestCompleteAttempt.overallScore, latestAssessment.latestCompleteAttempt.overallMaxScore)}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Image src={image} w="200px" />
                                        </Box>
                                    </Stack>
                                </Skeleton>
                            </Box>
                        </Box>
                    )}


                    <Heading mb={5} color="blue.600">Assessment History</Heading>
                    <Box w="100%" h="500px" rounded="md" mt={5} p={5} overflowY="auto">
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                            {attempts.map((attempt) => (
                                <Skeleton key={attempt._id} isLoaded={!loading}>
                                    <Box p={5} bg={cardBg} boxShadow="md" rounded="md">
                                        <Heading size="md" color="blue.600" mb={3}>
                                            Attempt {attempt.attemptNumber}
                                        </Heading>
                                        <Text mb={2}>
                                            Date: {new Date(attempt.date).toLocaleDateString()}
                                        </Text>
                                        <Text mb={2}>
                                            Overall Score: {attempt.overallScore} / {attempt.overallMaxScore}
                                        </Text>
                                        <Progress value={attempt.overallScore} max={attempt.overallMaxScore} />
                                    </Box>
                                </Skeleton>
                            ))}
                        </SimpleGrid>
                    </Box>

                </>
            ) : (
                <Flex w="100%" h="100vh" alignItems="center" justifyContent="center" bg={cardBg} p={5}>
                    <VStack spacing={8} textAlign="center">
                        <Image src={appLogo} alt="Welcome" boxSize="200px" />
                        <Box>
                            <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                                Welcome to HealthCheckPro!
                            </Text>
                            <Text fontSize="lg" color="gray.600" mt={3}>
                                We're excited to have you here. Let's get started on your journey to better health.
                            </Text>
                        </Box>
                        <Button mt={5} colorScheme="blue" size="lg" onClick={startNewRound}>
                            Start Your First Health Assessment
                        </Button>
                    </VStack>
                </Flex>
            )}

        </Box>
    );
}

UserStatusUI.propTypes = {
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


export default UserStatusUI;
