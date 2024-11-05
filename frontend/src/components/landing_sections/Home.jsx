import { Box, Button, Container, Flex, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AiFillHeart } from "react-icons/ai";
import { Link as NLink } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useCustomTheme from "../../hooks/useCustomTheme";
import homePageAnimation from '../../assets/homePage.lottie';

const Home = () => {
    const { landingBg, textColor, headingColor, subheadingColor } = useCustomTheme();

    const buttonColor = useColorModeValue("gray", "whiteAlpha.300");

    return (
        <Box bg={landingBg} minH="100vh" display="flex" alignItems="center" py={10}>
            <Container maxW="90%">
                {/* Main Content */}
                <Flex
                    direction={["column", "row"]}
                    align="center"
                    justify="center"
                    gap={8}
                    py={10}
                    mt={{
                        base: 20,
                        md: 0
                    }}
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

                        <Button
                            as={NLink}
                            to="/login"
                            rightIcon={<ExternalLinkIcon />}
                            borderRadius="full"
                            boxShadow="md"
                            p={10}
                            maxW="500px"
                            mx={["auto", "0"]}
                            fontSize="xl"
                        >
                            Get Started
                        </Button>
                    </Box>

                    {/* Lottie Animation */}
                    <Box flex="1" align="center" display="flex" justifyContent="center" px={4}>
                        <DotLottieReact
                            src={homePageAnimation}
                            loop
                            autoplay
                            style={{ minWidth: '50svw' }}
                        />
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}

export default Home;