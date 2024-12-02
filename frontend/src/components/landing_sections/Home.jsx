import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { AiFillHeart } from "react-icons/ai";
import { Link as NLink } from "react-router-dom";
import homePageAnimation from '../../assets/illustrations/consultation.json';
import useCustomTheme from "../../hooks/useCustomTheme";
import { memo } from "react";
import useGlobalState from "../../hooks/useGlobalState";


const Home = () => {
    const { landingBg, textColor, headingColor, subheadingColor } = useCustomTheme();
    const { user } = useGlobalState();

    const buttonColor = useColorModeValue("gray", "whiteAlpha.300");

    return (<Box as="section" id="home" bg={landingBg} minH="100vh" display="flex" alignItems="center" pb={10}>
        <Container maxW="90%">
            {/* Main Content */}
            <Flex
                direction={["column", "row"]}
                align="center"
                justify="center"
                gap={8}

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
                        Comprehensive Health Check
                    </Heading>
                    <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={2}>
                        for your overall well-being.
                    </Text>
                    <Text fontSize="lg" color={subheadingColor} mt={4} mb={8}>
                        Assess your mental, physical, nutritional, lifestyle, and biomarker health to get personalized insights and recommendations.
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
                        {
                            user ? "Go to Dashboard" : "Get Started"
                        }
                    </Button>
                </Box>

                {/* Lottie Animation */}
                <Box flex="1" align="center" display="flex" justifyContent="center" px={4}>
                    <Lottie animationData={homePageAnimation} />
                </Box>
            </Flex>
        </Container>

    </Box>
    );
}

export default memo(Home);