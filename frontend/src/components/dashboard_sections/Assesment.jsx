// Assessment.js
import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Heading,
  HStack,
  VStack,
  Progress,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { FaBell, FaUserCircle, FaBars } from 'react-icons/fa';
import { ChevronDownIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import useAssessment from '../../hooks/useAssessment';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const hoverColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box bg={bg} px={6} py={3} shadow="md" position="sticky" top="0" zIndex="1000">
      <Flex alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        <Heading color="blue.600" fontSize="xl" fontWeight="bold">
          HealthCheckPro
        </Heading>
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          {['Home', 'Dashboard', 'About', 'Contact'].map((link) => (
            <Text
              key={link}
              cursor="pointer"
              fontWeight="medium"
              _hover={{ color: hoverColor }}
              transition="color 0.2s"
            >
              {link}
            </Text>
          ))}
        </HStack>
        <HStack spacing={4}>
          <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`} aria-label="A tooltip">
            <IconButton
              aria-label="Toggle Theme"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            />
          </Tooltip>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm" variant="ghost">
              English
            </MenuButton>
            <MenuList>
              <MenuItem>English</MenuItem>
              <MenuItem>Spanish</MenuItem>
              <MenuItem>French</MenuItem>
            </MenuList>
          </Menu>
          <Tooltip label="User Profile" aria-label="User Profile">
            <IconButton
              icon={<FaUserCircle />}
              variant="ghost"
              aria-label="User Profile"
              _hover={{ color: hoverColor }}
            />
          </Tooltip>
          <Tooltip label="Notifications" aria-label="Notifications">
            <IconButton
              icon={<FaBell />}
              variant="ghost"
              aria-label="Notifications"
              _hover={{ color: hoverColor }}
            />
          </Tooltip>
          <Tooltip label="More Options" aria-label="More Options">
            <IconButton
              icon={<FaBars />}
              variant="ghost"
              aria-label="More Options"
              _hover={{ color: hoverColor }}
              display={{ base: 'inline-flex', md: 'none' }}
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  );
};

const Assessment = () => {
  const { assessmentStatus, fetchAssessmentStatus } = useAssessment();

  useEffect(() => {
    fetchAssessmentStatus();
  }, [fetchAssessmentStatus]);

  const bg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Finished':
        return 'green';
      case 'In Progress':
        return 'yellow';
      case 'Not Started':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'green';
    if (progress >= 50) return 'blue';
    return 'orange';
  };

  return (
    <Box bg={bg} minH="100vh">
      <Navbar />
      <Box p={6} maxW="900px" mx="auto" mt={4}>
        <Flex
          bgGradient="linear(to-r, blue.400, blue.600)"
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
          color="white"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bgGradient="linear(to-r, rgba(0,0,0,0.6), rgba(0,0,0,0.6))"
          />
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
          <Heading position="relative" zIndex="1" ml="20%" textAlign="center">
            Assessment Overview
          </Heading>
        </Flex>
        <Box
          textAlign="center"
          mb={6}
          p={4}
          bg={cardBg}
          borderRadius="md"
          shadow="sm"
        >
          <Text fontWeight="semibold" fontSize="lg" color="gray.700">
            Name: Jayant Khandelwal
          </Text>
          <Text fontSize="sm" color="gray.500">
            Email: khandelwaljayant1634@gmail.com | ID: 12345 | Age: 20
          </Text>
        </Box>
        {assessmentStatus && assessmentStatus.map((assessment) => (
          <Box
            key={assessment.id}
            p={6}
            mb={6}
            bg={cardBg}
            borderRadius="lg"
            shadow="md"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            transition="all 0.3s"
            _hover={{
              transform: 'translateY(-4px)',
              shadow: 'lg',
              bg: useColorModeValue('blue.50', 'gray.600'),
            }}
          >
            <HStack spacing={4} w={{ base: '100%', md: 'auto' }}>
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
                <Text fontSize="sm" color="gray.500">
                  {assessment.description}
                </Text>
                <Badge colorScheme={getStatusColor(assessment.status)}>{assessment.status}</Badge>
              </VStack>
            </HStack>
            <VStack align="start" spacing={1} w={{ base: '100%', md: '30%' }} mt={{ base: 4, md: 0 }}>
              <Progress
                value={assessment.progress}
                size="sm"
                colorScheme={getProgressColor(assessment.progress)}
                borderRadius="full"
                transition="width 0.5s ease-in-out"
              />
              <Text fontSize="sm" color="gray.600">
                {assessment.progress}%
              </Text>
            </VStack>
            <Button
              colorScheme={assessment.progress === 100 ? 'green' : 'blue'}
              size="sm"
              variant="solid"
              mt={{ base: 4, md: 0 }}
              _hover={{ bg: assessment.progress === 100 ? 'green.600' : 'blue.600', color: 'white' }}
              aria-label={assessment.progress === 100 ? 'Review Assessment' : 'Start Assessment'}
            >
              {assessment.progress === 100 ? 'Review' : 'Start'}
            </Button>
          </Box>
        ))}
        <Box textAlign="center" mt={8}>
          <Button
            colorScheme="blue"
            size="lg"
            variant="solid"
            borderRadius="full"
            px={10}
            py={6}
            shadow="md"
            _hover={{ bg: 'blue.600', color: 'white', boxShadow: 'lg' }}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Assessment;
