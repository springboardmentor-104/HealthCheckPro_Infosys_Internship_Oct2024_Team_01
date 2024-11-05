import { Box, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import useCustomTheme from "../../hooks/useCustomTheme";

const DemoCard = ({ title, description, children }) => {

    const {cardBg} = useCustomTheme();
  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      width="320px"
      boxShadow="md" // You can use 'sm', 'md', 'lg', etc., or a custom value
      mx={{ base: "auto", md: 0 }}
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


DemoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default DemoCard;

