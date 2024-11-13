import { useState, useEffect } from 'react';
import {
    Box, Text, SimpleGrid, Heading, Button,
    Flex, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator, useSteps, Progress,
    VStack,
    Tag,
    HStack,
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from 'recharts';
import Chart from './Chart';
import Assessment from './Assessment';
import useCustomTheme from '../../hooks/useCustomTheme';

const UserStatusUI = () => {
    const [scoreData, setScoreData] = useState({
        totalScore: 100,
        healthStatus: 'Good',
        date: '28/10/24'
    });

    const scoreProgress = [
        { name: 'Physical Health', value: 80, attemptedQuestions: 10 },
        { name: 'Mental Wellbeing', value: 70, attemptedQuestions: 8 },
        { name: 'Nutrition', value: 90, attemptedQuestions: 9 },
        { name: 'Lifestyle', value: 85, attemptedQuestions: 7 },
        { name: 'Bio Markers', value: 75, attemptedQuestions: 6 },
    ];

    const { activeStep } = useSteps({
        index: scoreProgress.length,
        count: scoreProgress.length,
    });

    const { cardBg } = useCustomTheme();

    return (
        <Box bgColor={cardBg} p={5} shadow="md" rounded="md">
            <Flex justify="space-between">
                <Heading color='blue.600' mb={5}>
                    Last Attempt
                </Heading>
                <HStack gap={5}>
                    <Text>Attempted on: {scoreData.date}</Text>
                    <Tag colorScheme="green">Completed</Tag>
                </HStack>
            </Flex>

            <Flex justify="center">
                <ResponsiveContainer width={300} height={300}>
                    <PieChart>
                        <Pie data={scoreProgress} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                            {scoreProgress.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value > 75 ? '#82ca9d' : '#ff8042'} />
                            ))}
                            <Label value={`${scoreData.totalScore}%`} position="center" />
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <VStack mt={5} gap={5} p={5} >
                    <Box><Heading>
                        Health Status
                    </Heading>
                        <Button w="full" size="lg" colorScheme={
                            scoreData.healthStatus === 'Good' ? 'green' : 'red'
                        }>
                            {
                                scoreData.healthStatus === 'Good' ? "Good" : "Poor"
                            }
                        </Button></Box>
                </VStack>
            </Flex>
        </Box>
    );
}

const DashHome = () => {
    useEffect(() => {
        // Fetch data from the backend and update scoreData
        // Example:
        // fetchData().then(data => setScoreData(data));
    }, []);

    return (
        <>
            <Assessment />
            <UserStatusUI />
        </>
    );
};

export default DashHome;
