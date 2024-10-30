import React, { useState, useEffect } from 'react';
import DashHome1 from './DashPage1';
import DashHome2 from './DashPage2';
import DashHome3 from './DashPage3';
import DashHome4 from './DashPage4';
import { Contact } from '../landing_sections';

import {
  Box,
  Text,
  Heading,
  Center,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  VStack,
} from '@chakra-ui/react';

const DashHome = () => {
  const [scoreData, setScoreData] = useState({
    totalScore: 80,
    healthStatus: 'Good',
    score: 80,
    attend: 95,
    date: '28/10/24'
  });

  useEffect(() => {
    // Fetch data from the backend and update scoreData
    // Example:
    // fetchData().then(data => setScoreData(data));
  }, []);

  return (

    <>
    <Box maxWidth={{base: '90%', md:'800px'}} mx='auto' >
      {/* Header */}
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="blue.500" mb={{ base: 8, md: 10 }} textAlign="center">
        OVERALL PERFORMANCE ON ({scoreData.date}) :
      </Text>

      <Flex 
        direction={{ base: "column", md: "row" }} 
        align="center" 
        justify="center" 
        gap={{ base: 10, md: 12 }}
      >
        
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
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
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
        <Box w={{ base: "100%", md: "30%" }} maxW="800px">
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
      </Flex>

      <DashHome1/>
      <DashHome2/>
      <DashHome3/>
      <DashHome4/>
     
    </Box>
    <Box w="100svw">
    <Contact/>
    </Box>

</>

//page 1 begins from here

            
          
  );
};

export default DashHome;




