import { useState } from 'react';
import { Box, Text, Stack, FormControl, Heading, FormLabel, Input, HStack, Button, IconButton, VStack, FormErrorMessage } from '@chakra-ui/react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import useGlobalState from '../hooks/useGlobalState';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setUser } = useGlobalState();

    const { signup, loading,error } = useSignup();
    const navigate = useNavigate();

    const handleRegister = async () => {
        ;
        await signup(username, email, password, confirmPassword)
            .then((response) => {
                if (response) {
                    setUser(response);
                    localStorage.setItem('user', JSON.stringify(response));
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                <Box>
                    <Heading mb={4} zIndex={2}>
                        Sign Up to get your nutrients
                    </Heading>
                    <Text fontSize="md">
                        If you already have an account you can{" "}
                        <Text as={Link} to="/login" color="blue.600" width="fit-content" fontSize="xl" fontWeight="bold" ml={4}>
                            Login here!
                            <Box as='span' width="1px" height="1px" rounded={"full"} boxShadow={"-200px -150px 60px 80px rgb(0,0,255,.075),-50px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={1}>
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
                    <FormControl id="email" isInvalid={!email && error}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            bgColor="gray.200"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {!email && error && <FormErrorMessage>{error}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="username" isInvalid={!username && error}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            bgColor="gray.200"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {!username && error && <FormErrorMessage>{error}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="password" isInvalid={!password && error}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            bgColor="gray.200"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!password && error && <FormErrorMessage>{error}</FormErrorMessage>}
                    </FormControl>
                    <FormControl id="confirmPassword" isInvalid={!confirmPassword && error}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            bgColor="gray.200"
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {!confirmPassword && error && <FormErrorMessage>{error}</FormErrorMessage>}
                    </FormControl>
                    <Button colorScheme="blue" width="full" mt={4} onClick={handleRegister} isLoading={loading}>
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