// Desc: Login page for the user to login to the application
// Note: Do not change this file unless you know what you are doing

import { Box, Button, FormControl, FormLabel,  Heading,  Image, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle,FcSms } from "react-icons/fc";
import { Link as NLink, useNavigate } from "react-router-dom";
import useGlobalState from "../hooks/useGlobalState";
import useLogin from "../hooks/useLogin";
import authbg from "/authbg.png";
import useCustomTheme from "../hooks/useCustomTheme";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, login } = useLogin();
  const navigate = useNavigate();
  const { setUser } = useGlobalState();
  const {bodyBg,inputBg,authBg} = useCustomTheme();

  const handleSubmit = async () => {
    await login(email, password).then((data) => {
      if (data) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    }).catch((error) => {
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
        <Box position={"fixed"}bottom={0} right={0}  as='span' width="1px" height="1px" rounded={"full"} boxShadow={"-200px -150px 60px 80px rgb(0,0,255,.075),-50px 0px 100px 120px rgb(0,0,255,.2)"} zIndex={0}></Box>
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
        <Stack maxWidth="100%" minWidth="200px" spacing={4}  p={3} rounded="md" bgColor={authBg}>
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

          <Button variant="link" colorScheme="blue" w="fit-content" h="fit-content" as={NLink} to="/reset-pass">Forgot Password?</Button>

          <Button colorScheme="blue" width="full" mt={4} isLoading={loading} onClick={handleSubmit}>
            Sign In
          </Button>
        </Stack>

        <Box mt={5} display={{ base: "block", md: "none" }} textAlign="center">
          Don&apos;t have an account? <Button fontSize="lg" variant="link" as={NLink} to="/register" colorScheme="blue">Register from here!</Button>
        </Box>

        <Text textAlign="center" mt={4}>Or continue with</Text>


        <VStack gap={3} p={3} >
          <Button width="50%" variant="outline" colorScheme='red' leftIcon={<FcGoogle size={25} />}>Google</Button>
          <Button width="50%" variant="outline" colorScheme='teal' leftIcon={<FcSms size={25} />}>Phone</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;