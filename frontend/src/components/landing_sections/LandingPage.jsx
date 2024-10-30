import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FiCamera, FiMic } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import doctorImage from '../../assets/Doctor-removebg-preview_enhanced.png';

import useCustomTheme from "../../hooks/useCustomTheme";

const LandingPage = () => {
  const { landingBg, cardBg } = useCustomTheme();

  // Define color mode-dependent styles
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const headingColor = useColorModeValue("blue.500", "blue.300");
  const subheadingColor = useColorModeValue("gray.600", "gray.400");
  const buttonColor = useColorModeValue("gray", "whiteAlpha.300");

  return (
    <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" py={10}>
      <Container maxW="container.lg">
        {/* Main Content */}
        <Flex
          direction={["column", "row"]}
          align="center"
          justify="center"
          gap={8}
          py={10}
        >
          {/* Text Section */}
          <Box flex="1" textAlign={["center", "left"]} px={4}>
            <Button
              size="sm"
              colorScheme={buttonColor}
              variant="outline"
              leftIcon={<Icon as={AiFillHeart} color="red.400" boxSize={4} />}
              mb={4}
            >
              Health Matters
            </Button>
            <Heading as="h2" size="2xl" color={headingColor} mb={1}>
              One Step Solution
            </Heading>
            <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={2}>
              for all your dietary needs.
            </Text>
            <Text fontSize="lg" color={subheadingColor} mt={4} mb={8}>
              Using your BMI index, we calculate whether the dish is suitable for you.
            </Text>

            {/* Search Bar */}
            <Flex
              mt={4}
              align="center"
              bg={useColorModeValue("white", "gray.700")}
              p={3}
              borderRadius="full"
              boxShadow="md"
              w={["100%", "80%"]}
              maxW="500px"
              mx={["auto", "0"]}
            >
              <Input
                placeholder="Search your product"
                variant="unstyled"
                ml={4}
                flex="1"
                color={textColor}
              />
              <Button variant="ghost" colorScheme="gray">
                <Icon as={FiCamera} boxSize={6} color={headingColor} />
              </Button>
              <Button variant="ghost" colorScheme="gray">
                <Icon as={FiMic} boxSize={6} color={headingColor} />
              </Button>
              <Button variant="ghost" colorScheme="blue" borderRadius="full" p={2}>
                <SearchIcon boxSize={6} color={headingColor} />
              </Button>
            </Flex>
          </Box>

          {/* Doctor Image */}
          <Box flex="1" align="center" display="flex" justifyContent="center" px={4}>
            <Image src={doctorImage} alt="Doctor" maxH="450px" /> {/* Adjusted image size */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LandingPage;
