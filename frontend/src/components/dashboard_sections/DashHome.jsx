<<<<<<< HEAD
import { useEffect, useState } from 'react';
// import DashHome1 from './DashPage1';

import {
    Box,
    Center,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    Heading,
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';
// import useCustomTheme from '../../hooks/useCustomTheme';

// const Overview = () => {
//     // State to hold backend data
//     const [data, setData] = useState({
//         score: 20,
//         totalScore: 25,
//         attend: 21,
//         totalAttend: 25,
//         healthStatus: "Good",
//     });

//     const { cardBg } = useCustomTheme();

//     // Fetch data from backend (simulated with useEffect)
//     useEffect(() => {
//         // Simulate API call to fetch data
//         const fetchData = async () => {
//             // Replace this with an actual API call
//             const backendData = {
//                 score: 20,
//                 totalScore: 25,
//                 attend: 21,
//                 totalAttend: 25,
//                 healthStatus: "Good",
//             };
//             setData(backendData);
//         };

//         fetchData();
//     }, []);

//     return (
//         <Box p={5} maxW="1200px" mx="auto">
//             {/* Header */}
//             <Heading fontSize="lg" textAlign="center" mb={4}>
//                 1. PHYSICAL FITNESS
//             </Heading>

//             {/* Top Icons Section */}
//             <HStack justifyContent="center" spacing={10} mb={6} padding={4} bg={cardBg} borderRadius="lg">
//                 <Box as="span" role="img" fontSize="4xl">🏃</Box>
//                 <Box as="span" role="img" fontSize="4xl">💪</Box>
//                 <Box as="span" role="img" fontSize="4xl">🧘</Box>
//                 <Box as="span" role="img" fontSize="4xl">🚴</Box>
//             </HStack>

//             {/* Main Content Section */}
//             <Flex gap={8} mb={8}>
//                 {/* Left Section - Bar Graph and Score */}
//                 <VStack flex="1" spacing={6} align="stretch">
//                     <Text fontSize="2xl" fontWeight="bold" textAlign="center">
//                         OVERALL PERFORMANCE IN PHYSICAL FITNESS:
//                     </Text>

//                     {/* Placeholder for the bar graph */}
//                     <Box w="100%" h="200px" bg="gray.200" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
//                         <Text color="gray.500">Bar Graph Placeholder</Text>
//                     </Box>

//                     {/* Score */}
//                     <Text fontSize="lg" fontWeight="bold" textAlign="center">
//                         {data.score}/{data.totalScore} (Score)
//                     </Text>
//                 </VStack>

//                 {/* Right Section - Profile and Health Status */}
//                 <VStack flex="1" spacing={4} align="stretch" p={4} bg={cardBg} borderRadius="lg">
//                     {/* Health Status */}
//                     <Box textAlign="center">
//                         <Text fontSize="2xl" fontWeight="bold" color="blue.500">
//                             Your Fit 🔥
//                         </Text>
//                         <Text fontSize="xl" color="blue.500">
//                             Health Upgrade({data.healthStatus})
//                         </Text>
//                         <Text mt={2} >
//                             Online solution looks at your physical health & mental health
//                         </Text>
//                     </Box>

//                     {/* User Profile Picture */}
//                     <Avatar size="2xl" src="https://via.placeholder.com/100" alt="User" mx="auto" />
//                 </VStack>
//             </Flex>

//             {/* Solved Questions Section */}
//             <VStack align="stretch" spacing={4}>
//                 <Text fontSize="xl" fontWeight="bold">
//                     SOLVED QUESTIONS:
//                 </Text>

//                 {/* Score Progress */}
//                 <Flex w="100%" align="center">
//                     <Text flex="1" fontSize="lg">Score</Text>
//                     <Box flex="3">
//                         <Progress value={(data.score / data.totalScore) * 100} colorScheme="blue" />
//                     </Box>
//                     <Text flex="1" ml={2} fontSize="lg">
//                         {data.score}/{data.totalScore}
//                     </Text>
//                 </Flex>

//                 {/* Attendance Progress */}
//                 <Flex w="100%" align="center">
//                     <Text flex="1" fontSize="lg">Attend</Text>
//                     <Box flex="3">
//                         <Progress value={(data.attend / data.totalAttend) * 100} colorScheme="blue" />
//                     </Box>
//                     <Text flex="1" ml={2} fontSize="lg">
//                         {data.attend}/{data.totalAttend}
//                     </Text>
//                 </Flex>
//             </VStack>
//         </Box>
//     );
// };
=======
import React, { useState, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import DemoCard from './DemoCard';
>>>>>>> 3f529c21b0fe0e5059e00dfa7caa9641c4f77fec

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

<<<<<<< HEAD
                {/* Left Section - Health Status */}
                <VStack
                    spacing={6}
                    align="flex-start"
                    textAlign="left"
                    w={{ base: "100%", md: "30%" }}
                    maxW="400px"
                >
                    <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} color="blue.500">
                        Health Upgrade ({scoreData.healthStatus}) <span role="img" aria-label="fire">🔥</span>
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }} >
                        You've made excellent progress so far; improving your speed without sacrificing quality could help you reach your full potential.
                    </Text>
                </VStack>

                {/* Center Section - Circular Progress */}
                <Center w={{ base: "100%", md: "30%" }} py={6}>
                    <VStack>
                        <CircularProgress
                            value={scoreData.totalScore}
                            size={{ base: "180px", md: "200px", lg: "220px" }}
                            thickness="12px"
                            color="blue.500"
                            trackColor="yellow.400"
                        >
                            <CircularProgressLabel fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold">
                                {scoreData.totalScore}/100
                            </CircularProgressLabel>
                        </CircularProgress>
                        <Text mt={4} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                            Total Score
                        </Text>
                    </VStack>
                </Center>

                {/* Right Section - Score and Attendance */}
                <Box w={{ base: "100%", md: "30%" }} maxW="600px">
                    <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="black" mb={6}>
                        SOLVED QUESTIONS :
                    </Text>
                    <Flex justify="space-between" align="center" mb={3}>
                        <Text fontSize={{ base: "md", md: "lg" }}>Score</Text>
                        <Text fontSize={{ base: "md", md: "lg" }}>{scoreData.score}/100</Text>
                    </Flex>
                    <Progress
                        colorScheme="blue"
                        value={scoreData.score}
                        size="lg"
                        borderRadius="md"
                        mb={6}
                    />

                    <Flex justify="space-between" align="center" mb={3}>
                        <Text fontSize={{ base: "md", md: "lg" }}>Attend</Text>
                        <Text fontSize={{ base: "md", md: "lg" }}>{scoreData.attend}/100</Text>
                    </Flex>
                    <Progress
                        colorScheme="yellow"
                        value={scoreData.attend}
                        size="lg"
                        borderRadius="md"
                    />
                </Box>
=======
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
>>>>>>> 3f529c21b0fe0e5059e00dfa7caa9641c4f77fec
            </Flex>
        </Box>
    );
};

export default DashHome;
