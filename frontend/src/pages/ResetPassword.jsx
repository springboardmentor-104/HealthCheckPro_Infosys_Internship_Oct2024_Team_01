import { useState } from 'react';
import {
    Box, Text, Stack, FormControl, Heading, FormLabel, Input,
    Button ,VStack, Image,Flex
} from '@chakra-ui/react';
import { Link as NLink,useNavigate } from 'react-router-dom';
import useResetPassword from '../hooks/useResetPassword';
import authbg from '/authbg.png';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { error, isLoading, resetPassword } = useResetPassword();

    const handleSubmit = async () => {
        await resetPassword(email, password, confirmPassword)
            .then(() => {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                if(error)
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            minHeight="100vh"
            width="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#f0f4ff"
            position="relative"
            overflowX="hidden"
        >
            <Box position="fixed" w="100svw" h="100svh" >
                <Box position="fixed" as='span' width="1px" height="1px" rounded={"full"} boxShadow={"200px 150px 60px 80px rgb(0,0,255,.075),0px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}>
                </Box>
                <Box bottom={0} right={0} position="fixed" as='span' width="1px" height="1px" rounded={"full"} boxShadow={"-200px -150px 60px 80px rgb(0,0,255,.075),-50px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}>
                </Box>
            </Box>

            
            <Flex
                width={{ base: "100%", md: "fit-content" }}
                p={{ base: 4, md: 10 }}
                textAlign={{ base: "center", md: "left" }}
                align="center"
                justify={"center"}
                zIndex={2}

                flexDirection={{
                    base: "column",
                    md: "row"
                }}
            >
                    <VStack  spacing={4}>
                        <Heading color="blue.600" size="xl">
                            Reset Your Password
                        </Heading>
                        <Text fontSize="lg" fontWeight="bold">
                            Or
                        </Text>
                        <Button backdropFilter="blur(10px)" leftIcon={<ExternalLinkIcon/>} variant="outline" w="100%" width="100%" as={NLink} to="/login" colorScheme="blue">
                            Go Back to Login Page
                        </Button>
                        <Button backdropFilter="blur(10px)" leftIcon={<ExternalLinkIcon/>} variant="outline" w="100%" width="100%" as={NLink} to="/register" colorScheme="green">
                            Go to Signup Page
                        </Button>
                        <Button backdropFilter="blur(10px)" leftIcon={<ExternalLinkIcon/>} variant="outline" w="100%" width="100%" as={NLink} to="/" colorScheme="teal">
                            Go to Home Page
                        </Button>
                    </VStack>
            </Flex>
            <Image src={authbg} position="fixed" width="60%" objectFit="cover" opacity={0.1} zIndex={0} minW="500px" />
            <Box
                width={{md:"30%"}}
                minWidth="400px"
                p={{ base: 4, md: 10 }}
                borderRadius="md"
            >
                <Stack maxWidth="100%" minWidth="200px" spacing={4} border="2px" borderColor="gray.200" p={3} rounded="md" bgColor={{
                    base: "white",
                }}  backdropFilter="blur(10px)">
                    <FormControl id="email" isInvalid={!email && error}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            width="full"
                            minW="150px"
                            bgColor={{ base: "gray.100", md: "gray.50" }}
                            backdropFilter={{ base: "blur(5px)", md: "none" }}
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isInvalid={!password && error}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            width="full"
                            minW="150px"
                            bgColor={{ base: "gray.100", md: "gray.50" }}
                            backdropFilter={{ base: "blur(10px)", md: "none" }}
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="confirmPassword" isInvalid={!confirmPassword && error}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            width="full"
                            minW="150px"
                            bgColor={{ base: "gray.100", md: "gray.50" }}
                            backdropFilter={{ base: "blur(10px)", md: "none" }}
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button colorScheme="blue" width="full" mt={4} onClick={handleSubmit} isLoading={isLoading}>
                        Reset Password
                    </Button>
                </Stack>
                <Box mt={5} display={{
                    base: "block",
                    md: "none"
                }} textAlign="center">Remember your password? <Button fontSize="lg" variant="link" width="100%" as={NLink} to="/login" colorScheme="blue" >Login from here!</Button></Box>

            </Box>
        </Box>
    );
}

export default ResetPassword;
