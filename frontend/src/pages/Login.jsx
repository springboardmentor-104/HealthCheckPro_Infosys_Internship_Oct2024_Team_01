import {
  Box, Button, FormControl, FormLabel, Heading, Image, Input, Stack, Text, VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  FormHelperText,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as NLink ,useNavigate} from "react-router-dom";

import useLogin from "../hooks/useLogin";
import authbg from "/authbg.png";
import useCustomTheme from "../hooks/useCustomTheme";
import useOTP from "../hooks/useOTP";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, login } = useLogin();


  const { bodyBg, inputBg, authBg } = useCustomTheme();
  const { sendOTPAction, loading:otpLaoding } = useOTP();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    await login(email, password).catch((error) => {
      console.log(error);
    });
  };

  const handleSendOTP = async () => {
    await sendOTPAction(email).
    then((res) => {
      console.log('=== res Login.jsx [42] ===', res);
      navigate(`/reset-pass/${email}`);
    }).
    catch((error) => {
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
      backgroundColor={bodyBg}
      position="relative"
      overflowX="hidden"
    >
      <Box position="fixed" w="100svw" h="100svh" display={{ base: "block", md: "none" }}>
        <Box position={"fixed"} as='span' width="1px" height="1px" rounded={"full"} boxShadow={"200px 150px 60px 80px rgb(0,0,255,.075),0px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}></Box>
        <Box position={"fixed"} bottom={0} right={0} as='span' width="1px" height="1px" rounded={"full"} boxShadow={"-200px -150px 60px 80px rgb(0,0,255,.075),-50px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}></Box>
      </Box>

      <Box p={4} display={{ base: "block", md: "none" }} zIndex={3}>
        <Text fontWeight="bold">Hi! Welcome back to</Text>
        <Heading as={NLink} to="/" color="blue.600">HealthCheckPro</Heading>
        <Text>Sign In to continue!</Text>
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
          Hi! Welcome back to <Heading size="2xl" as={NLink} to="/" color="blue.600">HealthCheckPro</Heading>
        </Heading>
        <Heading size="md">Sign In to continue!</Heading>
        <Text fontSize="md">
          If you don&apos;t have an account you can{" "}
          <Text position="absolute" as={NLink} to="/register" color="blue.600" width="fit-content" fontSize="xl" fontWeight="bold" ml={4}>
            Register here!
            <Box position="fixed" as='span' width="1px" height="1px" rounded={"full"} boxShadow={"-200px -150px 60px 80px rgb(0,0,255,.075),-50px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}></Box>
          </Text>
        </Text>
      </VStack>

      <Image src={authbg} position="fixed" width="60%" objectFit="cover" opacity={0.1} zIndex={0} minW="500px" />

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

          <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} closeOnBlur={false}>
            <PopoverTrigger>
              <Button marginLeft="auto" variant="link" w="fit-content" h="fit-content">Forgot Password?</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Reset Your Password!</PopoverHeader>
              <PopoverBody>
                <FormControl isInvalid={!email && error}>
                  <Input mt={3} type="email" placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormHelperText my={3} textAlign="center">OTP will be sent on your mail to verify you.</FormHelperText>
                </FormControl>
                <Button w="100%" colorScheme="blue" onClick={handleSendOTP} isLoading={otpLaoding}>Send OTP</Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button colorScheme="blue" width="full" mt={4} isLoading={loading} onClick={handleSubmit}>
            Sign In
          </Button>
        </Stack>

        <Box mt={5} display={{ base: "block", md: "none" }} textAlign="center">
          Don&apos;t have an account? <Button fontSize="lg" variant="link" as={NLink} to="/register" colorScheme="blue">Register from here!</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
