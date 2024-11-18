import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Progress,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as NLink } from 'react-router-dom';
import useCustomTheme from '../../hooks/useCustomTheme';
import useAssessment from '../../hooks/useAssessment';
import useGlobalState from '../../hooks/useGlobalState';
import banner from '../../assets/banner.jpg';

const UserProfileUI = () => {
  const { cardBg } = useCustomTheme();
  const {
    assessmentStatus,
    assessmentHistory,
    latestAssessment,
    fetchAssessmentStatus,
    fetchAssessmentHistory,
    fetchLatestAssessment,
  } = useAssessment();

  useEffect(() => {
    fetchAssessmentStatus();
    fetchAssessmentHistory();
    fetchLatestAssessment();

  }, [fetchAssessmentStatus, fetchAssessmentHistory, fetchLatestAssessment]);

  const assessments = assessmentStatus || [];

  const { user } = useGlobalState();

  return (
    <Box mt={20}>
      <Box p={6} w="100%" mx="auto" mt={4}>
        {/* Header */}
        <Flex
          bg="blue.100"
          borderRadius="lg"
          align="center"
          position="relative"
          // overflow="hidden"
          bgImage={banner}
          bgSize="cover"
          bgPos="center"
          mb={8}
          shadow="md"
          h="200px"
        >
          <Avatar
            size="2xl"
            name={user.username}
            position="absolute"
            left="5%"
            top="40%"
            transform="translateY(50%)"
            border="4px solid"
            shadow="lg"
            zIndex={100}
          />

        </Flex>
        <Box mt={
          {
            base: 20,
            md: 0,
          }} w="100%" textAlign="center" mb={6}>
          <Heading fontWeight="semibold" color="CaptionText">
            {user.username}
          </Heading>
          <HStack w={"full"} gap={3} justify="center" mt={6} zIndex={5} >
            <Tag colorScheme="blue" size="lg">
              {user.email}
            </Tag>
            {user.age && <Tag colorScheme="blue" size="lg">
              {user.age}
            </Tag>}
            {user.gender && <Tag colorScheme="blue" size="lg">
              {user.gender}
            </Tag>}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileUI;
