import {
    Box,
    Button,
    CircularProgress,
    CircularProgressLabel,
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

import NWImg from '../../../assets/banner-nr1.gif';
import NewLoginLogo from '../../../assets/illustrations/newl-3.gif';

import { Link as ScrollLink } from 'react-scroll';
import {

    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

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
    const { cardBg, bgOverlay } = useCustomTheme();
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
    const suggestions = (assessments) => {
        return (
            <VStack align="start" spacing={3}>
                {assessments.map((category, index) => {
                    const percentage = Math.floor((category.totalScore / category.maxScore) * 100);
                    let categoryFeedback;

                    if (percentage >= 90) {
                        categoryFeedback = `Excellent job in ${category.categoryName}! Keep up the great work.`;
                    } else if (percentage >= 75) {
                        categoryFeedback = `Good job in ${category.categoryName}. You're doing well, but there's room for improvement.`;
                    } else if (percentage >= 60) {
                        categoryFeedback = `Fair performance in ${category.categoryName}. Consider focusing more on this area.`;
                    } else if (percentage >= 40) {
                        categoryFeedback = `Needs improvement in ${category.categoryName}. Try to work harder in this category.`;
                    } else {
                        categoryFeedback = `Poor performance in ${category.categoryName}. It's important to pay more attention to this area.`;
                    }

                    return (
                        <Box key={index} rounded="md" w="100%">
                            <Text>{categoryFeedback}</Text>
                        </Box>
                    );
                })}
            </VStack>
        );
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

                        <Box w="100%" overflow="hidden" bg={cardBg} rounded={{
                            base: 'none',
                            md: 'md'
                        }} boxShadow="lg" textAlign="center" bgImage={NWImg} bgSize="cover" bgRepeat="no-repeat" >

                            <Box p="80px" bgColor={bgOverlay}>
                                <Heading size="lg" mb={3}>
                                    Ready for a New Challenge?
                                </Heading>
                                <Text fontSize="md" mb={5} color="white">
                                    Start a new round to continue improving your health and track your progress.
                                </Text>
                                <Button colorScheme="blue" size="lg" onClick={handleStartRound}>
                                    Start New Round
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {latestAssessment?.latestCompleteAttempt && (
                        <Box p={5} rounded="md" mt={5} >
                            <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" alignItems="center" gap={3}>
                                <Heading color="blue.600" textAlign={{
                                    base: 'center',
                                    md: 'left'
                                }}>
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
                                    <Heading mb={5} size="lg" color="blue.600" textAlign={{
                                        base: 'center',
                                        md: 'left'
                                    }}>Report Summary</Heading>
                                    {healthStatus(latestAssessment.latestCompleteAttempt.overallScore, latestAssessment.latestCompleteAttempt.overallMaxScore)}
                                    <Stack direction={{ base: 'column', md: 'row' }} p={5} bg={cardBg} rounded="md" boxShadow="md">
                                        <Box flex={1}>
                                            <Heading size="md" mb={3}>
                                                Insights
                                            </Heading>
                                            <Text>
                                                {suggestions(latestAssessment.latestCompleteAttempt.assessments)}
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


                    <Heading textAlign={{
                        base: 'center',
                        md: 'left'
                    }} mb={5} color="blue.600">Assessment History</Heading>
                    <Box w="100%" h="500px" rounded="md" mt={5} p={5} overflowY="auto">
                        <Skeleton isLoaded={!loading}>
                            <Table variant="simple" size="md">
                                <Thead>
                                    <Tr>
                                        <Th>Attempt Number</Th>
                                        <Th>Date</Th>
                                        <Th>Overall Score</Th>
                                        <Th>Report</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {attempts.map((attempt) => (
                                        <Tr key={attempt._id}>
                                            <Td>
                                                <Text fontWeight="bold" color="blue.600">
                                                    {attempt.attemptNumber}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <Text>
                                                    {new Date(attempt.date).toLocaleDateString()}
                                                </Text>
                                            </Td>
                                            <Td>
                                                <HStack align="center">
                                                    <CircularProgress value={attempt.overallScore} max={attempt.overallMaxScore} mt={2} >
                                                        <CircularProgressLabel>{
                                                            Math.floor((attempt.overallScore / attempt.overallMaxScore) * 100)
                                                        }%</CircularProgressLabel>
                                                    </CircularProgress>
                                                    <Text>
                                                        {attempt.overallScore}/{attempt.overallMaxScore}
                                                    </Text>
                                                </HStack>
                                            </Td>
                                            <Td>
                                                <Button w="full">View Report</Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Skeleton>
                    </Box>

                </>
            ) : (
                <Flex w="100%" h="100vh" alignItems="center" justifyContent="center" bg={cardBg} p={5}>
                    <VStack spacing={8} textAlign="center">
                        <Image src={NewLoginLogo} alt="Welcome" boxSize="300px" />
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
