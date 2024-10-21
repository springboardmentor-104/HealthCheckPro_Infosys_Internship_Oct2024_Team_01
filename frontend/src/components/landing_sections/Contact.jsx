
import { Box, Flex, Heading, Text, Link, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Contact = () => {
    return (
        <Box bg="gray.900" color="white" p={{ base: 5, md: 10 }} id="contact">
            <HStack justify="space-between">
                <VStack width="40%" align="center" gap={5} display={{
                    base: "none", md: "flex"
                }}>
                    <Heading size="xl">HealthCheckPro</Heading>

                    <VStack>
                        <Heading  size="md">Contact Us</Heading>
                        <VStack align="start">

                            <Text><strong style={{
                                textDecoration: "underline"
                            }}>Email:</strong> contact@company.com</Text>
                            <Text><strong style={{
                                textDecoration: "underline"
                            }}>Phone:</strong> (414) 687 - 5892</Text>
                            <Text><strong style={{
                                textDecoration: "underline"
                            }}>Address:</strong> 794 Mcallister St, San Francisco, 94102</Text>
                        </VStack>
                        <HStack spacing={5} mt={2} >
                            <Link href="#"><Icon as={FaFacebook} boxSize="6" /></Link>
                            <Link href="#"><Icon as={FaTwitter} boxSize="6" /></Link>
                            <Link href="#"><Icon as={FaInstagram} boxSize="6" /></Link>
                            <Link href="#"><Icon as={FaLinkedin} boxSize="6" /></Link>
                            <Link href="#"><Icon as={FaYoutube} boxSize="6" /></Link>
                        </HStack>
                    </VStack>
                </VStack>
                <Flex flex={1} justify="space-between" wrap="wrap" rowGap={10}>
                    <VStack align="start">
                        <Heading as="h3" size="md">Product</Heading>
                        <Link href="#">Features</Link>
                        <Link href="#">Pricing</Link>
                        <Link href="#">Case Studies</Link>
                        <Link href="#">Reviews</Link>
                        <Link href="#">Updates</Link>
                    </VStack>
                    <VStack align="start">
                        <Heading as="h3" size="md">Company</Heading>
                        <Link href="#">About</Link>
                        <Link href="#">Contact Us</Link>
                        <Link href="#">Careers</Link>
                        <Link href="#">Culture</Link>
                        <Link href="#">Blog</Link>
                    </VStack>
                    <VStack align="start">
                        <Heading as="h3" size="md">Support</Heading>
                        <Link href="#">Getting Started</Link>
                        <Link href="#">Help Center</Link>
                        <Link href="#">Server Status</Link>
                        <Link href="#">Report a Bug</Link>
                        <Link href="#">Chat Support</Link>
                    </VStack>
                    <VStack align="start">
                        <Heading  size="lg">Contact Us</Heading>
                        <Text>Email: contact@company.com</Text>
                        <Text>Phone: (414) 687 - 5892</Text>
                        <Text>Address: 794 Mcallister St, San Francisco, 94102</Text>
                    </VStack>
                </Flex>
            </HStack>
            <HStack mt={10} justify={"space-around"} display={{ base: "flex", md: "none" }}>
                <Link href="#"><Icon as={FaFacebook} boxSize="6" /></Link>
                <Link href="#"><Icon as={FaTwitter} boxSize="6" /></Link>
                <Link href="#"><Icon as={FaInstagram} boxSize="6" /></Link>
                <Link href="#"><Icon as={FaLinkedin} boxSize="6" /></Link>
                <Link href="#"><Icon as={FaYoutube} boxSize="6" /></Link>
            </HStack>
            <Text textAlign="center" mt={10}>&copy; 2022 Company. All rights reserved. | <Link href="#">Terms and Conditions</Link> | <Link href="#">Privacy Policy</Link></Text>
        </Box>
    );
}

export default Contact;