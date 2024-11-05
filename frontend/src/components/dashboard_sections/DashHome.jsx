import React, { useState, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import DemoCard from './DemoCard';
<<<<<<< HEAD

const DashHome = () => {
    const [scoreData, setScoreData] = useState({
        totalScore: 100,
        healthStatus: 'Good',
        date: '28/10/24'
    });

    // Set the dynamic scores for the pie charts based on your requirements
    const scoreProgress = [
        { name: 'Overall Score', value: 45 },
        { name: 'Score Breakdown', value: 55 },
        { name: 'Health Metric Analysis', value: 68 },
        { name: 'Physical Health Overview', value: 75 },
        { name: 'Mental Wellness', value: 80 },
        { name: 'Lifestyle and Habits', value: 90 }
    ];

    // Generate the pie chart data
    const data = scoreProgress.map(score => [
        { name: `${score.value}/100`, value: score.value },
        { name: 'Remaining', value: 100 - score.value }
    ]);

    const COLORS = ['#1A73E8', '#D3D3D3'];

    useEffect(() => {
        // Fetch data from the backend and update scoreData
        // Example:
        // fetchData().then(data => setScoreData(data));
    }, []);

    return (
        <Box py={{ base: 10, md: 14 }} px={{ base: 6, md: 16 }} mt={20}>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="blue.500" mb={{ base: 8, md: 10 }} textAlign="center">
                OVERALL PERFORMANCE ON ({scoreData.date}) :
            </Text>

            <Flex direction="column" align="center" justify="center" gap={{ base: 10, md: 12 }} mb={10}>
                {/* Top Row - Three Pie Charts inside DemoCard */}
                <Flex direction="row" gap={6} justify="center" w="100%">
                    {scoreProgress.slice(0, 3).map((score, index) => (
                        <DemoCard key={index} title={score.name} description="Score representation">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={data[index]} cx="50%" cy="50%" outerRadius={100} innerRadius={80} fill="#00FF00" dataKey="value">
                                        {data[index].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </DemoCard>
                    ))}
                </Flex>

                {/* Bottom Row - Three Pie Charts inside DemoCard */}
                <Flex direction="row" gap={6} justify="center" w="100%" mt={10}>
                    {scoreProgress.slice(3, 6).map((score, index) => (
                        <DemoCard key={index + 3} title={score.name} description="Score representation">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={data[index + 3]} cx="50%" cy="50%" outerRadius={100} innerRadius={80} fill="#00FF00" dataKey="value">
                                        {data[index + 3].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </DemoCard>
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
};
=======
>>>>>>> 7af2d2f9a785de1d3bafee179fb983f200da5945

const DashHome = () => {
    const [scoreData, setScoreData] = useState({
        totalScore: 100,
        healthStatus: 'Good',
        date: '28/10/24'
    });

    // Set the dynamic scores for the pie charts based on your requirements
    const scoreProgress = [
        { name: 'Overall Score', value: 45 },
        { name: 'Score Breakdown', value: 55 },
        { name: 'Health Metric Analysis', value: 68 },
        { name: 'Physical Health Overview', value: 75 },
        { name: 'Mental Wellness', value: 80 },
        { name: 'Lifestyle and Habits', value: 90 }
    ];

    // Generate the pie chart data
    const data = scoreProgress.map(score => [
        { name: `${score.value}/100`, value: score.value },
        { name: 'Remaining', value: 100 - score.value }
    ]);

    const COLORS = ['#1A73E8', '#D3D3D3'];

    useEffect(() => {
        // Fetch data from the backend and update scoreData
        // Example:
        // fetchData().then(data => setScoreData(data));
    }, []);

    return (
        <Box py={{ base: 10, md: 14 }} px={{ base: 6, md: 16 }} mt={20}>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="blue.500" mb={{ base: 8, md: 10 }} textAlign="center">
                OVERALL PERFORMANCE ON ({scoreData.date}) :
            </Text>

            <Flex direction="column" align="center" justify="center" gap={{ base: 10, md: 12 }} mb={10}>
                {/* Top Row - Three Pie Charts inside DemoCard */}
                <Flex direction="row" gap={6} justify="center" w="100%">
                    {scoreProgress.slice(0, 3).map((score, index) => (
                        <DemoCard key={index} title={score.name} description="Score representation">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={data[index]} cx="50%" cy="50%" outerRadius={100} innerRadius={80} fill="#00FF00" dataKey="value">
                                        {data[index].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </DemoCard>
                    ))}
                </Flex>

                {/* Bottom Row - Three Pie Charts inside DemoCard */}
                <Flex direction="row" gap={6} justify="center" w="100%" mt={10}>
                    {scoreProgress.slice(3, 6).map((score, index) => (
                        <DemoCard key={index + 3} title={score.name} description="Score representation">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={data[index + 3]} cx="50%" cy="50%" outerRadius={100} innerRadius={80} fill="#00FF00" dataKey="value">
                                        {data[index + 3].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </DemoCard>
                    ))}
                </Flex>
            </Flex>
        </Box>
    );
};

export default DashHome;
