import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Stack,
    Text,
    VStack,
    HStack,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as NLink, useNavigate } from 'react-router-dom';
import useGlobalState from '../hooks/useGlobalState';
import useSignup from '../hooks/useSignup';
import authbg from '/authbg.png';
import useCustomTheme from '../hooks/useCustomTheme';
import VerifyOTP from '../components/VerifyOTP';
import useAuth from '../hooks/useAuth';


const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [otp, setOTP] = useState('');
    const { setUser } = useGlobalState();
    const { bodyBg, inputBg, authBg } = useCustomTheme();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { sendOTPAction, sendOTPLoading } = useAuth();
    const toast = useToast();
    const { signup, loading, error } = useSignup();
    const navigate = useNavigate();



    const handleOTPSubmit = async () => {
        console.log('=== email Register.jsx [53] ===', email);
        await sendOTPAction(email)
            .then(() => {
                onOpen();
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };



    const handleVerficationRegistration = async () => {
        await signup(otp, email, username, age, gender, password, confirmPassword)
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
            height={{ "md": "100svh" }}
            width="100%"
            alignItems="center"
            justifyContent="center"
            backgroundColor={bodyBg}
            position="relative"
            overflowX="hidden"
        >

            <Box position="fixed" w="100svw" h="100svh" display={{
                base: "block",
                md: "none"
            }}
            >
                <Box position="fixed" as='span' width="1px" height="1px" rounded={"full"} boxShadow={"200px 150px 60px 80px rgb(0,0,255,.075),0px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}>
                </Box>
                <Box bottom={0} right={0} position="fixed" as='span' width="1px" height="1px" rounded={"full"} boxShadow={"-200px -150px 60px 80px rgb(0,0,255,.075),-50px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}>
                </Box>
            </Box>

            <Box p={4} display={{
                base: "block",
                md: "none"
            }}>
                <Text fontWeight="bold">Hi! Welcome to</Text>
                <Heading as={NLink} to="/" color="blue.600">
                    HealthCheckPro
                </Heading>
                <Text>Sign Up to get your nutrients!</Text>
            </Box>
            <VStack
                width={{ base: "100%", md: "60%" }}
                p={{ base: 4, md: 10 }}
                textAlign={{ base: "center", md: "left" }}
                align="baseline"
                justify={"center"}
                zIndex={2}
                display={{ base: "none", md: "flex" }}
            >

                <Heading mb={4} size="xl">
                    Hi! Welcome to <Heading size="2xl" as={NLink} to="/" color="blue.600">HealthCheckPro</Heading>
                </Heading>
                <Heading size="md">
                    Sign Up to get your nutrients!
                </Heading>
                <Text fontSize="md">
                    If you already have an account you can{" "}
                    <Text position="absolute" as={NLink} to="/login" color="blue.600" width="fit-content" fontSize="xl" fontWeight="bold" ml={4} >
                        Login here!
                        <Box position="fixed" as='span' width="1px" height="1px" rounded={"full"} boxShadow={"-200px -150px 60px 80px rgb(0,0,255,.075),-50px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}>
                        </Box>
                    </Text>
                </Text>

            </VStack>
            <Image src={authbg} position="fixed" width="60%" objectFit="cover" opacity={0.1} zIndex={0} minW="500px" />
            {/* Right side */}
            <Box
                width={{ md: "30%" }}
                minWidth="400px"
                p={{ base: 4, md: 10 }}
                borderRadius="md"
            >

                <Stack maxWidth="100%" minWidth="200px" spacing={4} p={3} rounded="md" bgColor={{
                    base: "transparent", md: authBg
                }}>
                    <FormControl id="email" isInvalid={!email && error}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            width="full"
                            minW="150px"
                            bgColor={{ base: "transparent", md: inputBg }}
                            backdropFilter={{ base: "blur(5px)", md: "none" }}
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </FormControl>
                    <FormControl id="username" isInvalid={!username && error}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            width="full"
                            minW="150px"
                            bgColor={{ base: "transparent", md: inputBg }}
                            backdropFilter={{ base: "blur(10px)", md: "none" }}

                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <HStack>
                        <FormControl id="age" isInvalid={!age && error}>
                            <FormLabel>Age</FormLabel>
                            <Input
                                width="full"
                                minW="150px"
                                bgColor={{ base: "transparent", md: inputBg }}
                                backdropFilter={{ base: "blur(10px)", md: "none" }}
                                type="number"
                                placeholder="Enter Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="gender" isInvalid={!gender && error}>
                            <FormLabel>Gender</FormLabel>
                            <Select
                                width="full"
                                minW="150px"
                                bgColor={{ base: "transparent", md: inputBg }}
                                backdropFilter={{ base: "blur(10px)", md: "none" }}
                                placeholder="Select Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Select>
                        </FormControl>
                    </HStack>
                    <FormControl id="password" isInvalid={!password && error}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            width="full"
                            minW="150px"
                            bgColor={{ base: "transparent", md: inputBg }}
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
                            bgColor={{ base: "transparent", md: inputBg }}
                            backdropFilter={{ base: "blur(10px)", md: "none" }}
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                    </FormControl>

                    <Button colorScheme="blue" width="full" mt={4} onClick={handleOTPSubmit} isLoading={sendOTPLoading}>
                        Verify Email
                    </Button>
                </Stack>

                <Box mt={5} display={{
                    base: "block",
                    md: "none"
                }} textAlign="center">Already have an account? <Button fontSize="lg" variant="link" as={NLink} to="/login" colorScheme="blue" >Login from here!</Button></Box>


            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Verify your Email</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VerifyOTP setOTP={setOTP} />
                    </ModalBody>
                    <ModalFooter >
                        <Button colorScheme="blue" mr={3} onClick={handleVerficationRegistration} isLoading={loading}>
                            Verify & Regsiter
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Register;