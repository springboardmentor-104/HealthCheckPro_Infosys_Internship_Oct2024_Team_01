import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as NLink } from 'react-router-dom';
import useCustomTheme from '../../hooks/useCustomTheme';

const Assessment = () => {

  const { cardBg } = useCustomTheme();
  const assessments = [
  { id: 1, title: "PHYSICAL FITNESS", description: "Enrolled, Finished", progress: 100, imgSrc: "https://via.placeholder.com/50" },
  { id: 2, title: "NUTRITION", description: "Not Enrolled, Not Finished", progress: 0, imgSrc: "https://via.placeholder.com/50" },
  { id: 3, title: "MENTAL WELL-BEING", description: "Enrolled, In Progress", progress: 50, imgSrc: "https://via.placeholder.com/50" },
  { id: 4, title: "LIFESTYLE", description: "Not Enrolled, Not Finished", progress: 0, imgSrc: "https://via.placeholder.com/50" },
  ];

  return (
  <Box mt={20}>
    <Box p={6} maxW="900px" mx="auto" mt={4} >
    {/* Header */}
    <Flex
      bg="blue.100"
      p={8}
      borderRadius="lg"
      align="center"
      justify="center"
      position="relative"
      overflow="hidden"
      bgImage="url('https://via.placeholder.com/800x200')"
      bgSize="cover"
      bgPos="center"
      mb={8}
      shadow="md"
    >
      <Avatar
      size="xl"
      name="Jayant Khandelwal"
      src="https://via.placeholder.com/150"
      position="absolute"
      left="5%"
      top="50%"
      transform="translateY(-50%)"
      border="4px solid white"
      shadow="lg"
      />
      <Heading color="blue.700" fontSize="2xl" ml="20%" textAlign="center">
      Assessment
      </Heading>
    </Flex>

    {/* User Information */}
    <Box textAlign="center" mb={6}>
      <Text fontWeight="semibold" fontSize="lg" color="gray.700">Name: Jayant Khandelwal</Text>
      <Text fontSize="sm" color="gray.500">
      Email id: khandelwaljayant1634@gmail.com | Id no: 12345 | Age: 20
      </Text>
    </Box>

    {/* Assessment Cards */}
    {assessments.map((assessment) => (
      <Box
      key={assessment.id}
      p={6}
      mb={6}
      bg={cardBg}
      borderRadius="lg"
      shadow="lg"
      display="flex"
      flexDirection={{
        base: 'column',
        md: 'row',
      }}
      gap={10}
      alignItems="center"
      justifyContent="space-between"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{
        transform: 'scale(1.02)',
        boxShadow: 'xl',
      }}
      >
      {/* Left Section */}
      <HStack spacing={4} w="100%">
        <Avatar
        size="md"
        src={assessment.imgSrc}
        alt={assessment.title}
        bg="gray.100"
        p={2}
        borderRadius="full"
        shadow="sm"
        />
        <VStack align="start" spacing={0}>
        <Heading size="md" color="blue.600">
          {assessment.id}. {assessment.title}
        </Heading>
        <Text fontSize="sm" color="gray.500">{assessment.description}</Text>
        </VStack>
      </HStack>

      {/* Progress Bar */}
      <HStack w="100%">
        <VStack align="end" spacing={1} flex={1} ml={6} w="100%">
        <Progress value={assessment.progress} size="sm" width="100%" colorScheme="blue" borderRadius="full" />
        <Text fontSize="sm" >{assessment.progress}/100%</Text>
        </VStack>

        <Button
        as={NLink}
        to="/test"
        colorScheme="blue"
        size="sm"
        variant="solid"
        _hover={{ bg: 'blue.600', color: 'white' }}
        >
        Start
        </Button>
      </HStack>
      </Box>
    ))}
    </Box>
  </Box>
  );
}

export default Assessment;
