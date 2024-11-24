import { Box, Flex, Heading, Text, Link, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { memo, useMemo } from 'react';
import useCustomTheme from '../../hooks/useCustomTheme';

const Contact = () => {
    const { footerBg } = useCustomTheme();

    const socialLinks = useMemo(() => [
        { href: "#", icon: FaFacebook },
        { href: "#", icon: FaTwitter },
        { href: "#", icon: FaInstagram },
        { href: "#", icon: FaLinkedin },
        { href: "#", icon: FaYoutube }
    ], []);

    const sections = useMemo(() => [
        {
            heading: "Product",
            links: ["Features", "Pricing", "Case Studies", "Reviews", "Updates"]
        },
        {
            heading: "Company",
            links: ["About", "Contact Us", "Careers", "Culture", "Blog"]
        },
        {
            heading: "Support",
            links: ["Getting Started", "Help Center", "Server Status", "Report a Bug", "Chat Support"]
        }
    ], []);

    return (
        <Box as='section' bg={footerBg}  p={{ base: 5, md: 10 }} id="contact">
            <HStack justify="space-between">
                <VStack width="40%" align="center" gap={5} display={{ base: "none", md: "flex" }}>
                    <Heading size="xl">HealthCheckPro</Heading>

                    <VStack>
                        <Heading size="md">Contact Us</Heading>
                        <VStack align="start">
                            <Text><strong style={{ textDecoration: "underline" }}>Email:</strong> contact@company.com</Text>
                            <Text><strong style={{ textDecoration: "underline" }}>Phone:</strong> (414) 687 - 5892</Text>
                            <Text><strong style={{ textDecoration: "underline" }}>Address:</strong> 794 Mcallister St, San Francisco, 94102</Text>
                        </VStack>
                        <HStack spacing={5} mt={2}>
                            {socialLinks.map((link, index) => (
                                <Link key={index} href={link.href}><Icon as={link.icon} boxSize="6" /></Link>
                            ))}
                        </HStack>
                    </VStack>
                </VStack>
                <Flex flex={1} justify="space-between" wrap="wrap" rowGap={10}>
                    {sections.map((section, index) => (
                        <VStack key={index} align="start">
                            <Heading as="h3" size="md">{section.heading}</Heading>
                            {section.links.map((link, linkIndex) => (
                                <Link key={linkIndex} href="#">{link}</Link>
                            ))}
                        </VStack>
                    ))}
                    <VStack align="start">
                        <Heading size="lg">Contact Us</Heading>
                        <Text>Email: contact@company.com</Text>
                        <Text>Phone: (414) 687 - 5892</Text>
                        <Text>Address: 794 Mcallister St, San Francisco, 94102</Text>
                    </VStack>
                </Flex>
            </HStack>
            <HStack mt={10} justify={"space-around"} display={{ base: "flex", md: "none" }}>
                {socialLinks.map((link, index) => (
                    <Link key={index} href={link.href}><Icon as={link.icon} boxSize="6" /></Link>
                ))}
            </HStack>
            <Text textAlign="center" mt={10}>&copy; 2022 Company. All rights reserved. | <Link href="#">Terms and Conditions</Link> | <Link href="#">Privacy Policy</Link></Text>
        </Box>
    );
}

export default memo(Contact);
