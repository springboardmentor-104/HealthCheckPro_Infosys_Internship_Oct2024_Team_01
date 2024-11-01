import { Box, Text, Checkbox, Button, VStack, Fade } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import TestNavbar from './TestNavbar'; 

const Assessment = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false); 

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleStartClick = () => {
    if (isAgreed) {
      setShowNavbar(true); // Show navbar when "Start" is clicked
    } else {
      alert("Please agree to the instructions before starting.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling on unmount
    };
  }, []);

  return (
    <Fade in={true}>
      <VStack spacing={6} p={4} alignItems="center" minH="100vh">
        {/* Display General Instructions if navbar is not shown */}
        {!showNavbar && (
          <Box
            mt={8}
            p={{ base: 4, md: 6 }}
            bg="gray.100"
            rounded="md"
            shadow="md"
            w={{ base: "90%", md: "70%", lg: "60%" }}
            maxW="lg"
            textAlign="left"
          >
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }} mb={4}>
              General Instructions:
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>i) You have to complete entire questions.</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>ii) You cannot navigate during the Assessment.</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>iii) Your response will save after clicking the submit button.</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>iv) After completing one module, you can go to another module.</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>v) If you leave without completing, your response will not be submitted.</Text>
          </Box>
        )}

        {/* Hide Checkbox and Start Button when navbar is visible */}
        {!showNavbar && (
          <>
            <Checkbox
              colorScheme="blue"
              isChecked={isAgreed}
              onChange={handleCheckboxChange}
            >
              <Text color="red.500" fontSize={{ base: "sm", md: "md" }}>
                I have read and understood the instructions.
              </Text>
            </Checkbox>

            <Button
              colorScheme="blue"
              onClick={handleStartClick}
              isDisabled={!isAgreed}
              w={{ base: "90%", md: "auto" }}
            >
              Start
            </Button>
          </>
        )}

        {/* Show Navbar for Tests */}
        {showNavbar && <TestNavbar onTestSelect={(test) => console.log(`Selected: ${test}`)} />}
      </VStack>
    </Fade>
  );
};

export default Assessment;
