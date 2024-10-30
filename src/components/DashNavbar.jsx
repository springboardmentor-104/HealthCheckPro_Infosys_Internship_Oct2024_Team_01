import { Avatar, Box, VStack,Button } from "@chakra-ui/react";


const DashNavbar = () => {
    return (

            <Box borderRight="2px" p={3}>
                <VStack w="100%">
                    <Button p={5} w="full" leftIcon={ <Avatar size="sm" />} colorScheme="blue" variant="outline" justifyContent="left">
                            John Doe
                    </Button>
                </VStack>
            </Box>


    )
}

export default DashNavbar;