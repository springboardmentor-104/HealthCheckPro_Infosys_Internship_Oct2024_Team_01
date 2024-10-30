import React, { useEffect, useState } from 'react';
import { Box, Text, Progress, Flex, Avatar, Heading, VStack, HStack } from '@chakra-ui/react';
import image1 from '../../../dist/assets/3.jpg';
import image2 from '../../../dist/assets/bar1.png';

const DashHome1 = () => {
  const [data, setData] = useState({
    score: 10,
    totalScore: 25,
    attend: 21,
    totalAttend: 25,
    healthStatus: "Have to improve",
  });

  useEffect(() => {
    const fetchData = async () => {
      const backendData = {
        score: 10,
        totalScore: 25,
        attend: 21,
        totalAttend: 25,
        healthStatus: "Have to improve",
      };
      setData(backendData);
    };
    fetchData();
  }, []);

  return (
    <Box p={4} maxW="900px" mx="auto">
      {/* Header */}
      <Heading fontSize="md" textAlign="center" mb={3}>
        2. NUTRITION
      </Heading>

      {/* Top Icons Section */}
      <HStack justifyContent="center" spacing={8} mb={5} padding={3} bg="gray.100" borderRadius="md">
        <Box as="span" role="img" fontSize="3xl" color="blue.500">🍽️</Box>
        <Box as="span" role="img" fontSize="3xl" color="blue.500">🏋️</Box>
        <Box as="span" role="img" fontSize="3xl" color="blue.500">🩺</Box>
        <Box as="span" role="img" fontSize="3xl" color="blue.500">📈</Box>
      </HStack>

      {/* Title for Nutrition Performance */}
      <Text fontSize="lg" fontWeight="bold" mb={2} color="blue.600" textAlign="center">
        OVERALL PERFORMANCE IN NUTRITION
      </Text>

      {/* Images Section */}
      <Flex gap={5} mb={4} justifyContent="space-between" alignItems="center">
        {/* Left Section - Bar Graph */}
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <Avatar src={image2} alt="Performance Graph" w="100%" h="250px" borderRadius="lg" />
        </Box>

        {/* Right Section - User Avatar */}
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <Avatar src={image1} alt="User Image" w="100%" h="250px" borderRadius="lg" />
        </Box>
      </Flex>

      {/* Lower Section with Health Status and Solved Questions */}
      <Flex gap={5} mt={4} flexDirection={{ base: "column", md: "row" }}>
        {/* Health Status Section - Left */}
        <VStack flex="1" align="stretch" p={4} bg="gray.50" borderRadius="lg">
          <Text fontSize="lg" fontWeight="bold" textAlign="center" color="blue.500">
            Your Healthy 🥦🍎
          </Text>
          <Text fontSize="md" textAlign="center" color="blue.500">
            Health Upgrade: {data.healthStatus}
          </Text>
          <Text mt={1} fontSize="sm" textAlign="center" color="gray.600">
            Online solution looks at your physical health & mental health
          </Text>
        </VStack>

        {/* Solved Questions Section - Right */}
        <VStack flex="1" align="stretch" spacing={3}>
          <Text fontSize="lg" fontWeight="bold">
            SOLVED QUESTIONS:
          </Text>

          {/* Score Progress */}
          <Flex w="100%" align="center">
            <Text flex="1" fontSize="sm">Score</Text>
            <Box flex="3">
              <Progress value={(data.score / data.totalScore) * 100} colorScheme="blue" />
            </Box>
            <Text flex="1" ml={2} fontSize="sm">
              {data.score}/{data.totalScore}
            </Text>
          </Flex>

          {/* Attendance Progress */}
          <Flex w="100%" align="center">
            <Text flex="1" fontSize="sm">Attend</Text>
            <Box flex="3">
              <Progress value={(data.attend / data.totalAttend) * 100} colorScheme="blue" />
            </Box>
            <Text flex="1" ml={2} fontSize="sm">
              {data.attend}/{data.totalAttend}
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default DashHome1;
