import React, {useEffect, useState} from 'react';
import {
    Box, Flex, Heading, VStack, HStack, Tag, Text, Button, Stack, Td, Th, Tr,
    Table, Thead, Tbody, Center,useBreakpointValue
} from '@chakra-ui/react';

import PropTypes from 'prop-types';
import {Skeleton} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import useAssessment from '../../hooks/useAssessment';
import useCustomTheme from '../../hooks/useCustomTheme';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';



const PendingAssessment = ({status, latestAttempt, cardBg, history, startNewRound}) => {


    const handleStartRound = async () => {
        await startNewRound();
    }

    if (!status) {
        return (
            <Box bgColor={cardBg} p={5} rounded="md">
                <Skeleton height="20px" mb={4}/>
                <Skeleton height="20px" mb={4}/>
                <Skeleton height="20px" mb={4}/>
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
                <Heading color='red.600' mb={5}>
                    Pending Assessment Status
                </Heading>
                <HStack gap={5}>
                    <Text>Attempt Number: {status.attemptNumber}</Text>
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
    ) : (<Flex w="100%"  h={"300px"} alignItems="center">
        <Button mt={5} mx="auto" colorScheme="blue" size="lg" onClick={handleStartRound}>
            Start New Round
        </Button>
    </Flex>)
}


const LatestAttemptUI = ({latestCompleteAttempt, cardBg}) => {
    if (!latestCompleteAttempt) {
        return null;
    }

    return (
        <Box bgColor={cardBg} p={5} rounded="md" mt={5}>
            <Stack direction={{
                base: 'column',
                md: 'row'
            }} justify="space-between" alignItems="center" gap={3}><Heading color='green.600' mb={5}>
                Latest Completed Assessment
            </Heading><HStack gap={3}><Tag colorScheme="blue" variant="solid" size="lg">Attempt
                Number: {latestCompleteAttempt.attemptNumber}</Tag><Tag size="lg" variant="outline"
                                                                        colorScheme="blue">Date: {new Date(latestCompleteAttempt.date).toLocaleDateString()}</Tag></HStack>
            </Stack>

            <Stack direction={{
                base: 'column',
                md: 'row'
            }} justify="center" align="center" mt={5} gap={5} p={5}>
                <Box overflowX="auto" w={{base: "100%", md: "auto"}}>
                    <BarChart width={730} height={250} data={
                        latestCompleteAttempt.assessments.map((assessment) => ({
                            name: assessment.categoryName,
                            score: assessment.totalScore,

                        }))
                    }>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="score" fill="#8884d8"/>

                    </BarChart></Box>
                <Box flex={1} h="300px" position="relative" border="1px">


                    <Tag>Overall Score: {latestCompleteAttempt.overallScore}</Tag>
                </Box>
            </Stack>
        </Box>
    );
};

const AssessmentHistory = ({fetchAssessmentsHistory}) => {
    const [attempts, setAttempts] = useState([]);
    const {cardBg} = useCustomTheme();
    const isMobile = useBreakpointValue(
        {base: true, md: false}
    );

    useEffect(() => {
        const fetchHistory = async () => {
            const history = await fetchAssessmentsHistory();
            setAttempts(history);
        }
        fetchHistory();

    }, []);

    const renderPieChart = (score) => {
        const data = [
            {name: 'Score', value: score},
            {name: 'Remaining', value: 100 - score},
        ];
        const COLORS = ['#0088FE', '#00C49F'];

        return (
            <ResponsiveContainer width="100%" height={isMobile?50:200}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="24px"
                        fontWeight="bold"
                    >
                        {score}
                    </text>
                </PieChart>
            </ResponsiveContainer>
        );
    };

    return (
        <Box w="100%" h="500px" overflowY="auto" rounded="md" mt={5} p={5} bg={cardBg}>
            <Heading mb={5}>Assessment History</Heading>
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
                                <Center>{renderPieChart(attempt.overallScore)}</Center>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};


const UserStatusUI = () => {
    const {fetchAssessmentStatus, fetchLatestAssessment, startNewRound, fetchAssessmentHistory} = useAssessment();
    const [status, setStatus] = useState(null);
    const [latestAssessment, setLatestAssessment] = useState(null);
    const {cardBg} = useCustomTheme();
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
                    }/>
                    <LatestAttemptUI latestCompleteAttempt={latestAssessment?.latestCompleteAttempt} cardBg={cardBg}/>
                    <AssessmentHistory fetchAssessmentsHistory={fetchAssessmentHistory}/>
                </>
            ):(<Flex w="100%"  h={"300px"} alignItems="center">
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
