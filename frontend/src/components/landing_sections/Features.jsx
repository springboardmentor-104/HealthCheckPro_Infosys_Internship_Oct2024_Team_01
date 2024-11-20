import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FaFire, FaHeartbeat, FaHourglassHalf } from "react-icons/fa";
import { useMemo, memo } from "react";
import useCustomTheme from "../../hooks/useCustomTheme";

const Features = () => {
  const { featuresBg, cardBg } = useCustomTheme();

  const features = useMemo(() => [
    {
      icon: FaHeartbeat,
      title: "Monitor Health Status",
      description: "Track your health metrics in real-time for a healthier, balanced life."
    },
    {
      icon: FaHeartbeat,
      title: "Diet Plan",
      description: "Create a personalized diet plan tailored to your unique health needs and goals."
    },
    {
      icon: FaHeartbeat,
      title: "Health Lifecycle Insights",
      description: "Optimize every stage of your health journey with comprehensive lifecycle insights."
    }
  ], []);

  return (
    <Flex bg={featuresBg} py={10} px={6} justify="space-between" align="center" id="features" flexDirection={{
      base: "column",
      md: "row"
    }}>
      {/* Heading */}
      <Flex direction="column" mb={6} w={{ base: "100%", md: "40%" }}>
        <Stack alignItems="center" justify="center" mb={4}>
          <Text textAlign="center" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="blue.700">
            Limited-Time <Icon as={FaHourglassHalf} mx={2} /> <Icon as={FaFire} mx={2} />
          </Text>
          <Text textAlign="center" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="blue.700">Health Upgrade</Text>
        </Stack>
        <Text fontSize="md" textAlign="center">
          Online solution looks at your physical health & Mental Health
        </Text>
      </Flex>

      {/* Features */}
      <Flex gap={5} flexWrap={{ base: "wrap", lg: "nowrap" }} p={{
        base: 5,
        md: ""
      }} w={{ base: "100%", md: "60%" }} overflowX={{
        base: "auto",
        md: "unset"
      }} flexDirection={{
        base: "column",
        md: "row"
      }}>
        {features.map((feature, index) => (
          <Box key={index} bg={cardBg} p={6} rounded="md" shadow="md" w={{
            base: "100%",
            md: "auto"
          }} mb={{
            base: 4,
            md: 0
          }}>
            <Flex align="center" mb={4}>
              <Icon as={feature.icon} boxSize={6} color="blue.500" />
              <Text ml={2} fontSize="lg" fontWeight="bold" color="blue.500">
                {feature.title}
              </Text>
            </Flex>
            <Text>
              {feature.description}
            </Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}

export default memo(Features);
