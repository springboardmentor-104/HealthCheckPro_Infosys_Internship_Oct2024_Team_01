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
    useToast,
    FormHelperText
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as NLink } from 'react-router-dom';
import useGlobalState from '../hooks/useGlobalState';
import useSignup from '../hooks/useSignup';
import authbg from '/authbg.png';
import useCustomTheme from '../hooks/useCustomTheme';
import VerifyOTP from '../components/VerifyOTP';
import useOTP from '../hooks/useOTP';
import validator from 'validator';

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
    const { sendOTPAction, loading: otpLoading, verifyOTPAction } = useOTP();
    const toast = useToast();
    const { signup, loading, error } = useSignup();
    const [emailError, setEmailError] = useState(false);
    const [ageError, setAgeError] = useState(false);

    const handleOTPSubmit = async () => {
        if (!validator.isEmail(email)) {
            toast({
                title: "Email is not valid. Please enter a valid email",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            setEmailError(true);
            return;
        }
        console.log('=== email Register.jsx [53] ===', email);
        await sendOTPAction(email)
            .then(() => {
                onOpen();
            })
    };

    const handleVerficationRegistration = async () => {
        await verifyOTPAction(email, otp)
            .then((res) => {
                res && signup(email, username, age, gender, password, confirmPassword)
            })
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
            <Box p={4} display={{ base: "block", md: "none" }} zIndex={3}>
                <Text fontWeight="bold">Hi! Welcome back to</Text>
                <Button as={NLink} to="/" colorScheme="blue" variant="link" fontSize="3xl" >HealthCheckPro</Button>
                <Text textAlign="right">Sign Up to get your nutrients!</Text>
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
                    Hi! Welcome to <Button as={NLink} to="/" colorScheme="blue" variant="link" fontSize={80} >HealthCheckPro</Button>
                </Heading>
                <Heading size="md">
                    Sign Up to get your nutrients!
                </Heading>
                <Text fontSize="md">
                    Already have an account?{" "}
                    <Button variant="link" position="absolute" as={NLink} to="/login" colorScheme="blue" width="fit-content" fontSize="xl" fontWeight="bold" ml={4}>
                        Login here!
                    </Button>
                </Text>
            </VStack>
            <Image src={authbg} position="fixed" width="60%" objectFit="cover" opacity={0.1} zIndex={0} minW="500px" />
            <Box
                width={{ md: "30%" }}
                minWidth={{ base: "100%", md: "500px" }}
                p={{ base: 4, md: 10 }}
                borderRadius="md"
            >
                <Stack maxWidth="100%" minWidth="200px" spacing={4} p={3} rounded="md" >
                    <FormControl id="email" isInvalid={!email && error || emailError}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            width="full"
                            minW="150px"
                            bgColor={{ base: "transparent", md: inputBg }}
                            backdropFilter={{ base: "blur(5px)", md: "none" }}
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                const regExp = /[A-Z]/;
                                regExp.test(e.target.value) ? setEmailError(true) : setEmailError(false);
                            }}
                        />
                        {emailError && <FormHelperText textAlign="right">Enter a valid email</FormHelperText>}
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
                            boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <HStack>
                        <FormControl id="age" isInvalid={!age && error || ageError}>
                            <FormLabel>Age</FormLabel>
                            <Input
                                width="full"
                                minW="50px"
                                bgColor={{ base: "transparent", md: inputBg }}
                                backdropFilter={{ base: "blur(10px)", md: "none" }}
                                type="number"
                                placeholder="Enter Age"
                                value={age}
                                boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
                                onChange={(e) => {
                                    setAge(e.target.value);
                                    const ageValue = parseInt(e.target.value, 10);
                                    ageValue < 18 || ageValue > 80 ? setAgeError(true) : setAgeError(false);
                                }}
                            />
                            {ageError && <FormHelperText textAlign="right">Enter valid age (0-80)</FormHelperText>}
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
                                boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
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
                            boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
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
                            boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button colorScheme="blue" width="full" mt={4} onClick={handleOTPSubmit} isLoading={otpLoading || loading}>
                        Verify Email
                    </Button>
                </Stack>
                <Box mt={5} display={{
                    base: "block",
                    md: "none"
                }} textAlign="center">Already have an account? <Button fontSize="lg" variant="link" as={NLink} to="/login" colorScheme="blue" >Login here!</Button></Box>
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
                            Verify & Register
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Register;
