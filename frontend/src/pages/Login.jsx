import { useState } from "react";
import { Box, Text, Stack, FormControl, FormLabel, Input, Button, HStack, Heading, VStack, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import useGlobalState from "../hooks/useGlobalState";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, login } = useLogin();
  const navigate = useNavigate();
  const { setUser } = useGlobalState();

  const handleSubmit = async () => {
    await login(email, password).then((data) => {
      if (data) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    }
    ).catch((error) => {
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
      <Heading as={Link} to={"/"} position="absolute" top={50} left={50} fontSize="lg" color="blue.600">
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
            If you don&apos;t have an account you can{" "}
            <Text as={Link} to="/register" color="blue.600" width="fit-content" fontSize="xl" fontWeight="bold" ml={4}>
              Register here!
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
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
          Welcome Back
        </Text>

          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                bgColor="gray.200"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                bgColor="gray.200"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Text color="blue.400" textAlign="right" fontSize="sm" cursor="pointer">
              Recover Password?
            </Text>

            <Button colorScheme="blue" width="full" mt={4} isLoading={loading} onClick={handleSubmit}>
              Sign In
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
};

export default Login;