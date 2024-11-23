// Desc: About page component with additional features
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, Heading, Text, SimpleGrid, HStack, Image, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import landingBg from "../../assets/landing-img.png";
import useCustomTheme from "../../hooks/useCustomTheme";

const MotionBox = motion(Box);

const About = () => {
    const sections = [
        {
            title: "1. Who are we?",
            content: "Health Check Pro is a dedicated platform that empowers individuals with personalized insights to enhance their overall health and wellness. Our mission is to make health management accessible and actionable."
        },
        {
            title: "2. What do we do?",
            content: "We provide tools to monitor health metrics, customize diet plans, and offer guidance to optimize your wellness journey. Our comprehensive approach addresses both physical and mental health."
        },
        {
            title: "3. How do we help?",
            content: "Through advanced analytics and user-friendly interfaces, we deliver personalized health insights, actionable recommendations, and continuous support to enhance your well-being and foster sustainable habits."
        },
        {
            title: "4. Create success stories",
            content: "Join our community of success stories where individuals transform their health journeys. With Health Check Pro, achieve your wellness goals through personalized plans and encouragement from like-minded individuals."
        },
        {
            title: "5. Our Vision",
            content: "At Health Check Pro, we envision a world where everyone can achieve optimal health through informed choices, making wellness a way of life."
        },
    ];

    const { aboutBg, cardBg } = useCustomTheme();
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box p={5} bgColor={aboutBg} id='about'>
            <Flex align="center" p={5} direction={{ base: "column", md: "row" }}>
                <Box flex={1} pl={{ md: 10 }}>
                    <Heading mb={5} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="blue.700">
                        About Us
                    </Heading>
                    <Text mb={5} width={{ md: "70%" }} fontSize="md" color="gray.600">
                        Health Check Pro is your intuitive wellness companion, simplifying health management. We analyze your physical health, mental well-being, diet, and lifestyle choices. With personalized insights and recommendations, taking charge of your health has never been easier. Transform your well-being today with Health Check Pro.
                    </Text>
                </Box>
                <Grid width="30%" placeItems="center">
                    <Button 
                        width="fit-content" 
                        size="lg" 
                        colorScheme="blue" 
                        rightIcon={<ExternalLinkIcon />}
                        onClick={() => window.open('https://your-website.com', '_blank')}
                    >
                        Learn More
                    </Button>
                </Grid>
            </Flex>
            <HStack py={10}>
                <SimpleGrid mx="auto" w={{ md: "80%" }} columns={{ base: 1, md: 2 }} spacing={5} p={{ md: 10 }}>
                    {sections.map((section, index) => (
                        <MotionBox 
                            key={index} 
                            boxShadow="xl" 
                            borderRadius="lg" 
                            overflow="hidden" 
                            p={8} 
                            backgroundColor={cardBg}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Heading as="h2" size="md" fontSize={{ base: "2xl", md: "2xl" }} fontWeight="bold" color="blue.500">
                                {section.title}
                            </Heading>
                            <Text fontSize="md" color="gray.600">
                                {section.content}
                            </Text>
                        </MotionBox>
                    ))}
                </SimpleGrid>
                <MotionBox
                    display={{ base: "none", md: "block" }}
                    width="50%"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Image src={landingBg} />
                </MotionBox>
            </HStack>
        </Box>
    );
}

export default About;
