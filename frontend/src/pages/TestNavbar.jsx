import { Box, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom"; 

const TestNavbar = ({ onTestSelect }) => {
  const tests = ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"];

  return (
    <Box
      bg="blue.500"
      p={4}
      rounded="md"
      shadow="md"
      mb={4}
    >
      <HStack spacing={4} justifyContent="center"> {/* HStack for horizontal layout */}
        {tests.map((test, index) => (
          <Link key={index} to={`/assessment/${test.replace(" ", "").toLowerCase()}`}>
            <Button colorScheme="teal" onClick={() => onTestSelect(test)}>
              {test}
            </Button>
          </Link>
        ))}
      </HStack>
    </Box>
  );
};

export default TestNavbar;
