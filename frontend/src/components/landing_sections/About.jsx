// Desc: About page component
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, Heading, HStack, Image, SimpleGrid, Text } from '@chakra-ui/react';
import landingBg from "../../assets/landing-img.png";
import useCustomTheme from "../../hooks/useCustomTheme";

const About = () => {

    const sections = [
        {
            title: "1. Who are we",
            content: "Health Check Pro offers personalized insights to enhance your overall health and wellness."
        },
        {
            title: "2. What do we do",
            content: "Monitor health metrics, customize diet plans, and optimize your wellness journey."
        },
        {
            title: "3. How do we help",
            content: "We offer personalized health insights and tools to enhance your well-being."
        },
        {
            title: "4. Create success stories",
            content: "Transform your health journey and achieve your wellness goals with Health Check Pro."
        }
    ];

    const {aboutBg,cardBg} = useCustomTheme();

    return (
        <Box p={5} bgColor={aboutBg} id='about'>
            <Flex  align="center" p={5} direction={{
                base:"column",
                md:"row"
            }}>
                <Box flex={1} pl={{md:10}}>
                    <Heading mb={5} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="blue.700">
                        About Us
                    </Heading>
                    <Text mb={5} width={{md:"50%"}} fontSize="md" >
                        Health Check Pro is your intuitive wellness companion, simplifying health management. It analyzes your physical health, mental well-being, diet, and lifestyle choices. With personalized insights and recommendations, taking charge of your health has never been easier. Transform your well-being today with Health Check Pro.
                    </Text>
                </Box>
                <Grid width="30%" placeItems="center">
                    <Button width="fit-content" size="lg" colorScheme="blue" rightIcon={<ExternalLinkIcon />}>
                        Learn More
                    </Button>
                </Grid>
            </Flex>
            <HStack py={10}>
                <SimpleGrid mx="auto" w={{md:"80%"}} columns={{ base: 1, md: 1,lg:2 }} spacing={5} p={{md:10}}>
                    {sections.map((section, index) => (
                        <Box  key={index} boxShadow="xl" borderRadius="lg" overflow="hidden" p={10} backgroundColor={cardBg}>
                            <Heading as="h2" size="md"  fontSize={{ base: "2xl", md: "2xl" }} fontWeight="bold" color="blue.500">
                                {section.title}
                            </Heading>
                            <Text  fontSize="md" >
                                {section.content}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
                    <Image display={{base:"none",md:"block"}}  width="50%" src={landingBg}/>
            </HStack>
        </Box>
    );
}

export default About;