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
  } from '@chakra-ui/react';
  import { FaBell, FaUserCircle, FaBars } from 'react-icons/fa';
  import { ChevronDownIcon } from '@chakra-ui/icons';
  
  const Navbar = () => {
    return (
      <Box bg="white" px={6} py={3} shadow="lg" position="sticky" top="0" zIndex="10">
        <Flex alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
          {/* Logo / Title */}
          <Heading color="blue.600" fontSize="xl" fontWeight="bold">
            HealthCheckPro
          </Heading>
  
          {/* Navigation Links */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Text cursor="pointer" fontWeight="medium" _hover={{ color: 'blue.500' }}>Home</Text>
            <Text cursor="pointer" fontWeight="medium" _hover={{ color: 'blue.500' }}>Dashboard</Text>
            <Text cursor="pointer" fontWeight="medium" _hover={{ color: 'blue.500' }}>About</Text>
            <Text cursor="pointer" fontWeight="medium" _hover={{ color: 'blue.500' }}>Contact</Text>
          </HStack>
  
          {/* Right Side Icons and Menu */}
          <HStack spacing={4}>
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
            <IconButton icon={<FaUserCircle />} variant="ghost" aria-label="User Profile" _hover={{ color: 'blue.500' }} />
            <IconButton icon={<FaBell />} variant="ghost" aria-label="Notifications" _hover={{ color: 'blue.500' }} />
            <IconButton icon={<FaBars />} variant="ghost" aria-label="More Options" _hover={{ color: 'blue.500' }} />
          </HStack>
        </Flex>
      </Box>
    );
  };
  
  const Assessment = () => {
    const assessments = [
      { id: 1, title: "PHYSICAL FITNESS", description: "Enrolled, Finished", progress: 100, imgSrc: "https://via.placeholder.com/50" },
      { id: 2, title: "NUTRITION", description: "Not Enrolled, Not Finished", progress: 0, imgSrc: "https://via.placeholder.com/50" },
      { id: 3, title: "MENTAL WELL-BEING", description: "Enrolled, In Progress", progress: 50, imgSrc: "https://via.placeholder.com/50" },
      { id: 4, title: "LIFESTYLE", description: "Not Enrolled, Not Finished", progress: 0, imgSrc: "https://via.placeholder.com/50" },
    ];
  
    return (
      <Box>
        <Navbar /> {/* Navbar at the top */}
        
        <Box p={6} maxW="900px" mx="auto" mt={4}>
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
              bg="white"
              borderRadius="lg"
              shadow="lg"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              transition="transform 0.3s, box-shadow 0.3s"
              _hover={{
                transform: 'scale(1.02)',
                boxShadow: 'xl',
              }}
            >
              {/* Left Section */}
              <HStack spacing={4}>
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
              <VStack align="end" spacing={1} flex={1} ml={6}>
                <Progress value={assessment.progress} size="sm" width="100%" colorScheme="blue" borderRadius="full" />
                <Text fontSize="sm" color="gray.600">{assessment.progress}/100%</Text>
              </VStack>
  
              {/* Start Button */}
              <Spacer />
              <Button
                colorScheme="blue"
                size="sm"
                variant="solid"
                _hover={{ bg: 'blue.600', color: 'white' }}
              >
                Start
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
              Dashboard
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Assessment;
  