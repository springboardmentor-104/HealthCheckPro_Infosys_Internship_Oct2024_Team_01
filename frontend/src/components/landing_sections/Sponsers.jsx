import { Box, Flex, Text, SimpleGrid, Image } from "@chakra-ui/react";

// Import logos from assets directory
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.svg';
import logo3 from '../../assets/logo3.png';
import logo4 from '../../assets/logo4.svg';
import logo5 from '../../assets/logo5.svg';
import logo6 from '../../assets/logo6.svg';

// Create an array of objects containing the logo links and alt text
const logos = [
    { src: logo1, alt: "Company 1" },
    { src: logo2, alt: "Company 2" },
    { src: logo3, alt: "Company 3" },
    { src: logo4, alt: "Company 4" },
    { src: logo5, alt: "Company 5" },
    { src: logo6, alt: "Company 6" },
];

const Sponsers = () => {
    return (
        <Box bg="gray.100" py={10} px={6} id="sponsers">
            {/* Heading */}
            <Flex justify="center" mb={6}>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="gray.700">
                    TRUSTED BY OVER 100+ COMPANIES
                </Text>
            </Flex>

            {/* Company logos */}
            <SimpleGrid
                columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
                spacing={10}
                justifyItems="center"
                alignItems="center"
            >
                {logos.map((logo, index) => (
                    <Image key={index} src={logo.src} alt={logo.alt} maxW="100px" />
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default Sponsers;