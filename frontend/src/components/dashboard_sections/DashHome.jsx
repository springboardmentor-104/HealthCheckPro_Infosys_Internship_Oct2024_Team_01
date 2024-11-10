import { useState, useEffect } from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from 'recharts';
import Chart from './Chart';


const DashHome = () => {
    const [scoreData, setScoreData] = useState({
        totalScore: 100,
        healthStatus: 'Good',
        date: '28/10/24'
    });

    const scoreProgress = [
        { name: 'Overall Score', value: 45 },
        { name: 'Score Breakdown', value: 55 },
        { name: 'Health Metric Analysis', value: 68 },
        { name: 'Physical Health Overview', value: 75 },
        { name: 'Mental Wellness', value: 80 },
        { name: 'Lifestyle and Habits', value: 90 }
    ];

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
        <Box mt={20}>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="blue.500" mb={{ base: 8, md: 10 }} textAlign="center">
                OVERALL PERFORMANCE ON ({scoreData.date}) :
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 10, md: 12 }} mb={10}>
                {scoreProgress.map((score, index) => (
                    <Chart key={index} title={score.name} description="Score representation">
                        <ResponsiveContainer  width="100%" height={200}>
                            <PieChart>
                                <Pie data={data[index]} cx="50%" cy="50%" outerRadius={100} innerRadius={80} fill="#00FF00" dataKey="value">
                                    <Label value={`${score.value}/100`} position="center" fill="#1A73E8" fontSize="24px" fontWeight="bold" />
                                    {data[index].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Chart>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default DashHome;
