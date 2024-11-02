// Assessment.js
import React from 'react';
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
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
  Badge,
  Tooltip,
  Stack,
} from '@chakra-ui/react';
import { FaBell, FaUserCircle, FaBars } from 'react-icons/fa';
import { ChevronDownIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const hoverColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Box bg={bg} px={6} py={3} shadow="md" position="sticky" top="0" zIndex="1000">
      <Flex alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        {/* Logo / Title */}
        <Heading color="blue.600" fontSize="xl" fontWeight="bold">
          HealthCheckPro
        </Heading>

        {/* Navigation Links */}
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

        {/* Right Side Icons and Menu */}
        <HStack spacing={4}>
          {/* Theme Toggle */}
          <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`} aria-label="A tooltip">
            <IconButton
              aria-label="Toggle Theme"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
            />
          </Tooltip>

          {/* Language Selector */}
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

          {/* Icons */}
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
              display={{ base: 'inline-flex', md: 'none' }} // Show only on mobile
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  );
};

const Assessment = () => {
  const assessments = [
    { id: 1, title: "PHYSICAL FITNESS", description: "Enrolled, Finished", progress: 100, imgSrc: "https://via.placeholder.com/50", status: "Finished" },
    { id: 2, title: "NUTRITION", description: "Not Enrolled, Not Finished", progress: 0, imgSrc: "https://via.placeholder.com/50", status: "Not Started" },
    { id: 3, title: "MENTAL WELL-BEING", description: "Enrolled, In Progress", progress: 50, imgSrc: "https://via.placeholder.com/50", status: "In Progress" },
    { id: 4, title: "LIFESTYLE", description: "Not Enrolled, Not Finished", progress: 0, imgSrc: "https://via.placeholder.com/50", status: "Not Started" },
  ];

  const bg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  // Function to determine badge color based on status
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

  // Function to determine progress bar color based on progress value
  const getProgressColor = (progress) => {
    if (progress === 100) return 'green';
    if (progress >= 50) return 'blue';
    return 'orange';
  };

  return (
    <Box bg={bg} minH="100vh">
      <Navbar />

      <Box p={6} maxW="900px" mx="auto" mt={4}>
        {/* Header */}
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
          {/* Overlay for better text readability */}
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

        {/* User Information */}
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

        {/* Assessment Cards */}
        {assessments.map((assessment) => (
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
            {/* Left Section */}
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

            {/* Progress Bar */}
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

            {/* Start Button */}
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

        {/* Dashboard Button */}
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
