import {
    Box,
    Flex,
    Heading,
    Text,
    Link,
    VStack,
    HStack,
    Icon,
    Stack,
    Divider
  } from '@chakra-ui/react';
  import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube
  } from 'react-icons/fa';
  import useCustomTheme from '../../hooks/useCustomTheme';
  
  const Contact = () => {
    const { footerBg, textColor, linkColor, iconHoverColor } = useCustomTheme();
    return (
      <Box bg={footerBg} color={textColor} py={{ base: 8, md: 12 }} px={{ base: 5, md: 10 }} id="contact">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="start" mb={10}>
          
          {/* Brand and Contact Information */}
          <VStack align="start" w={{ base: '100%', md: '40%' }} spacing={4}>
            <Heading size="lg" color="teal.400">HealthCheckPro</Heading>
  
            <VStack align="start" spacing={2}>
              <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" color="pink.300">
                Contact Us
              </Text>
              <Text><strong>Email:</strong> contact@company.com</Text>
              <Text><strong>Phone:</strong> (414) 687 - 5892</Text>
              <Text><strong>Address:</strong> 794 Mcallister St, San Francisco, CA 94102</Text>
            </VStack>
  
            {/* Social Links */}
            <HStack spacing={4} mt={3}>
              <Link href="#" _hover={{ color: iconHoverColor }}>
                <Icon as={FaFacebook} boxSize={6} />
              </Link>
              <Link href="#" _hover={{ color: iconHoverColor }}>
                <Icon as={FaTwitter} boxSize={6} />
              </Link>
              <Link href="#" _hover={{ color: iconHoverColor }}>
                <Icon as={FaInstagram} boxSize={6} />
              </Link>
              <Link href="#" _hover={{ color: iconHoverColor }}>
                <Icon as={FaLinkedin} boxSize={6} />
              </Link>
              <Link href="#" _hover={{ color: iconHoverColor }}>
                <Icon as={FaYoutube} boxSize={6} />
              </Link>
            </HStack>
          </VStack>
  
          {/* Divider for Mobile View */}
          <Divider display={{ base: 'block', md: 'none' }} my={8} />
  
          {/* Quick Links */}
          <Flex flex="1" justify="space-around" wrap="wrap" rowGap={8} maxW="800px">
            <VStack align="start" spacing={2}>
              <Heading as="h3" size="sm" color="teal.400">Product</Heading>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Features</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Pricing</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Case Studies</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Reviews</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Updates</Link>
            </VStack>
  
            <VStack align="start" spacing={2}>
              <Heading as="h3" size="sm" color="teal.400">Company</Heading>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>About</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Contact Us</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Careers</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Culture</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Blog</Link>
            </VStack>
  
            <VStack align="start" spacing={2}>
              <Heading as="h3" size="sm" color="teal.400">Support</Heading>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Getting Started</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Help Center</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Server Status</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Report a Bug</Link>
              <Link href="#" color={linkColor} _hover={{ color: 'teal.300' }}>Chat Support</Link>
            </VStack>
          </Flex>
        </Flex>
  
        {/* Footer Bottom Section */}
        <Stack direction={{ base: 'column', md: 'row' }} justify="center" align="center" spacing={4} mt={10}>
          <Text fontSize="sm" textAlign="center">
            &copy; 2022 HealthCheckPro. All rights reserved.
          </Text>
          <HStack spacing={4}>
            <Link href="#" fontSize="sm" color={linkColor} _hover={{ color: 'teal.300' }}>
              Terms & Conditions
            </Link>
            <Link href="#" fontSize="sm" color={linkColor} _hover={{ color: 'teal.300' }}>
              Privacy Policy
            </Link>
          </HStack>
        </Stack>
      </Box>
    );
  };
  
  export default Contact;
  