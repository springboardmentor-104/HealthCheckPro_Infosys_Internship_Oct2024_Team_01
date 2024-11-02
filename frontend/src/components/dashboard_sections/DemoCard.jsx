import { Box, Text } from "@chakra-ui/react";

const DemoCard = ({ title, description, children }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      width="320px"
      boxShadow="md" // You can use 'sm', 'md', 'lg', etc., or a custom value
    >
      <Text fontWeight="bold" mt="2" fontSize="lg">
        {title}
      </Text>
      <Text fontSize="sm" mb={4} color="gray.600">
        {description}
      </Text>
      {children}
    </Box>
  );
};

export default DemoCard;
