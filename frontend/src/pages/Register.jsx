
import { Box, Text, Stack, FormControl, Heading, FormLabel, Input, HStack, Button, IconButton, VStack } from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            height="100vh"
            width="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#f0f4ff"
            position="relative"
        >
            {/* Left side */}
            <Heading as={Link} to={"/"} position="absolute" color="blue.600" top={50} left={50} fontSize="lg">
        HealthCheckPro
      </Heading>
            <VStack
                width={{ base: "100%", md: "60%" }}
                p={{ base: 4, md: 10 }}
                textAlign={{ base: "center", md: "left" }}

                align="baseline"
            >
                <Box >
                    <Heading mb={4} zIndex={2}>
                        Sign Up to get your nutrients
                    </Heading>
                    <Text fontSize="md">
                        If you already have an account you can{" "}
                        <Text as={Link} to="/login" color="blue.600" width="fit-content" fontSize="xl" fontWeight="bold" ml={4}>
                            Login here!
                            <Box as='span' width="1px" height="1px" rounded={"full"} boxShadow={"-200px -150px 60px 80px rgb(0,0,255,.075),-50px 0px 100px 120px rgb(0,0,255,.2)"}  zIndex={1}>
                            </Box>
                        </Text>
                    </Text>
                </Box>
            </VStack>

            {/* Right side */}
            <Box
                width={"30%"}
                p={{ base: 4, md: 10 }}
                borderRadius="md"
            >
                <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
                    Welcome User
                </Text>
                <Stack spacing={4}>
                    <FormControl id="email" >
                        <FormLabel>Email</FormLabel>
                        <Input bgColor="gray.200" type="email" placeholder="Enter Email" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input bgColor="gray.200" type="password" placeholder="********" />
                    </FormControl>
                    <HStack spacing={4}>
                        <FormControl id="age">
                            <FormLabel>Age</FormLabel>
                            <Input bgColor="gray.200" type="number" placeholder="Age" />
                        </FormControl>
                        <FormControl id="gender">
                            <FormLabel>Gender</FormLabel>
                            <Input bgColor="gray.200" placeholder="Gender" />
                        </FormControl>
                    </HStack>
                    <HStack spacing={4}>
                        <FormControl id="height">
                            <FormLabel>Height</FormLabel>
                            <Input bgColor="gray.200" type="number" placeholder="Height" />
                        </FormControl>
                        <FormControl id="weight">
                            <FormLabel>Weight</FormLabel>
                            <Input bgColor="gray.200" type="number" placeholder="Weight" />
                        </FormControl>
                    </HStack>
                    <Button colorScheme="blue" width="full" mt={4}>
                        Register
                    </Button>
                </Stack>

                <Text textAlign="center" mt={4}>
                    Or continue with
                </Text>

                <HStack justifyContent="center" spacing={4} mt={4}>
                    <IconButton
                        icon={<FcGoogle size={30} />}
                        variant="ghost"
                        aria-label="Continue with Google"
                    />
                    <IconButton
                        icon={<FaFacebook size={30} />}
                        variant="ghost"
                        aria-label="Continue with Facebook"
                        colorScheme='blue'
                    />
                    <IconButton
                        icon={<FaApple size={30} />}
                        variant="ghost"
                        aria-label="Continue with Apple"
                    />
                </HStack>
            </Box>
        </Box>
    );
}

export default Register;