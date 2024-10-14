import { Box ,Flex,HStack,Divider,Button} from "@chakra-ui/react";
import { Link } from "react-router-dom";


const Navbar = () =>{
    return (
        <>
            <Flex py={3} px={10} justify="space-between" align="center">
                <Box>
                    HealthCheckPro
                </Box>
                <HStack gap={10} ml={3}>
                    <Link to="/">Home</Link>
                    <Link to="/features">Features</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>
                </HStack>
                <HStack gap={5}>
                    <Box as={Link} to="/login">Login</Box>
                    <Button as={Link} to="/register">Register</Button>
                </HStack>
            </Flex>
            <Divider />
        </>
    )
}

export default Navbar;