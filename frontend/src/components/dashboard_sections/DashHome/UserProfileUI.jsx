import {
  Avatar,
  Box,
  Flex,
  Heading,
  Stack,
  Tag
} from '@chakra-ui/react';

import banner from '../../../assets/banner4.gif';

import useGlobalState from '../../../hooks/useGlobalState';

const UserProfileUI = () => {


  const { user } = useGlobalState();

  return (
    <Box mt={20}>
      <Box p={6} w="100%" mx="auto" mt={4}>
        {/* Header */}
        <Flex
          bg="blue.100"
          borderRadius="lg"
          align="center"
          position="relative"
          // overflow="hidden"
          bgImage={banner}
          bgSize='contain'
          bgPos="center"
          mb={8}
          shadow="md"
          h="200px"
        >
          <Avatar
            size="2xl"
            name={user.username}
            position="absolute"
            left="5%"
            top="40%"
            transform="translateY(50%)"
            border="4px solid"
            shadow="lg"
            zIndex={100}
          />

        </Flex>
        <Box mt={
          {
            base: 20,
            md: 0,
          }} w="100%" textAlign="center" mb={6}>
          <Heading fontWeight="semibold" color="CaptionText">
            {user.username}
          </Heading>
          <Stack direction={{
            base: "column",
            md: "row",
          }} w={"full"} gap={3} justify="center" mt={6} zIndex={5} >
            <Tag colorScheme="blue" size="lg" justifyContent="center">
              Email - {user.email}
            </Tag>
            {user.age && <Tag colorScheme="blue" size="lg" justifyContent="center">
              Age - {user.age}
            </Tag>}
            {user.gender && <Tag colorScheme="blue" size="lg" justifyContent="center">
              Gender - {user.gender}
            </Tag>}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileUI;
