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

const Assessment = () => {
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
            src="https://via.placeholder.com/150"
            position="absolute"
            left="5%"
            top="40%"
            transform="translateY(50%)"
            border="4px solid"
            shadow="lg"
            zIndex={100}
          />

        </Flex>
        <Box w="100%" textAlign="center" mb={6}>
          <Heading fontWeight="semibold" color="CaptionText">
            {user.username}
          </Heading>
          <VStack textAlign="center" mt={6} zIndex={5} >
            <Tag colorScheme="blue" size="lg">
              {user.email}
            </Tag>
            {user.age && <Tag colorScheme="blue" size="lg">
              {user.age}
            </Tag>}
            {user.gender && <Tag colorScheme="blue" size="lg">
              {user.gender}
            </Tag>}
          </VStack>
        </Box>



        {/* Assessment Cards */}
        {assessments.map((assessment) => (""
          // <Box
          //   key={assessment.id}
          //   p={6}
          //   mb={6}
          //   bg={cardBg}
          //   borderRadius="lg"
          //   shadow="lg"
          //   display="flex"
          //   flexDirection={{
          //     base: 'column',
          //     md: 'row',
          //   }}
          //   gap={10}
          //   alignItems="center"
          //   justifyContent="space-between"
          //   transition="transform 0.3s, box-shadow 0.3s"
          //   _hover={{
          //     transform: 'scale(1.02)',
          //     boxShadow: 'xl',
          //   }}
          // >
          //   {/* Left Section */}
          //   <HStack spacing={4} w="100%">
          //     <Avatar
          //       size="md"
          //       src={assessment.imgSrc}
          //       alt={assessment.title}
          //       bg="gray.100"
          //       p={2}
          //       borderRadius="full"
          //       shadow="sm"
          //     />
          //     <VStack align="start" spacing={0}>
          //       <Heading size="md" color="blue.600">
          //         {assessment.id}. {assessment.title}
          //       </Heading>
          //       <Text fontSize="sm" color="gray.500">
          //         {assessment.description}
          //       </Text>
          //     </VStack>
          //   </HStack>

          //   {/* Progress Bar */}
          //   <HStack w="100%">
          //     <VStack align="end" spacing={1} flex={1} ml={6} w="100%">
          //       <Progress
          //         value={assessment.progress}
          //         size="sm"
          //         width="100%"
          //         colorScheme="blue"
          //         borderRadius="full"
          //       />
          //       <Text fontSize="sm">{assessment.progress}/100%</Text>
          //     </VStack>

          //     <Button
          //       as={NLink}
          //       to="/test"
          //       colorScheme="blue"
          //       size="sm"
          //       variant="solid"
          //       _hover={{ bg: 'blue.600', color: 'white' }}
          //     >
          //       Start
          //     </Button>
          //   </HStack>
          // </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Assessment;
