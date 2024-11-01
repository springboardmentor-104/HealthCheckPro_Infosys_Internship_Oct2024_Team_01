import { Heading, Flex, HStack, Divider, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import Language from "./Language";

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            <Flex py={3} px={10} justify="space-between" align="center" position="relative">
                <Heading size={"md"} color={"blue.600"}>
                    HealthCheckPro
                </Heading>
                <HStack gap={10}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{
                            textDecoration: 'underline',
                            textDecorationColor: location.pathname === '/' ? 'blue' : 'transparent',
                            textUnderlineOffset: '4px',
                            transition: 'text-decoration-color 0.3s',
                            fontWeight: location.pathname === '/' ? 'bold' : 'normal'
                        }} onMouseEnter={(e) => e.target.style.textDecorationColor = 'blue'} onMouseLeave={(e) => e.target.style.textDecorationColor = location.pathname === '/' ? 'blue' : 'transparent'}>
                            Home
                        </span>
                    </Link>

                    <Link to="/assessment" style={{ textDecoration: 'none' }}>
                        <span style={{
                            textDecoration: 'underline',
                            textDecorationColor: location.pathname === '/assessment' ? 'blue' : 'transparent',
                            textUnderlineOffset: '4px',
                            transition: 'text-decoration-color 0.3s',
                            fontWeight: location.pathname === '/assessment' ? 'bold' : 'normal'
                        }} onMouseEnter={(e) => e.target.style.textDecorationColor = 'blue'} onMouseLeave={(e) => e.target.style.textDecorationColor = location.pathname === '/assessment' ? 'blue' : 'transparent'}>
                            Assessment
                        </span>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <span style={{
                            textDecoration: 'underline',
                            textDecorationColor: location.pathname === '/contact' ? 'blue' : 'transparent',
                            textUnderlineOffset: '4px',
                            transition: 'text-decoration-color 0.3s',
                            fontWeight: location.pathname === '/contact' ? 'bold' : 'normal'
                        }} onMouseEnter={(e) => e.target.style.textDecorationColor = 'blue'} onMouseLeave={(e) => e.target.style.textDecorationColor = location.pathname === '/contact' ? 'blue' : 'transparent'}>
                            Contact
                        </span>
                    </Link>
                    <Link to="/about" style={{ textDecoration: 'none' }}>
                        <span style={{
                            textDecoration: 'underline',
                            textDecorationColor: location.pathname === '/about' ? 'blue' : 'transparent',
                            textUnderlineOffset: '4px',
                            transition: 'text-decoration-color 0.3s',
                            fontWeight: location.pathname === '/about' ? 'bold' : 'normal'
                        }} onMouseEnter={(e) => e.target.style.textDecorationColor = 'blue'} onMouseLeave={(e) => e.target.style.textDecorationColor = location.pathname === '/about' ? 'blue' : 'transparent'}>
                            About
                        </span>
                    </Link>
                    <Language />
                    <Button colorScheme="blue" variant="link" as={Link} to="/login">Login</Button>
                    <Button colorScheme="blue" as={Link} to="/register">Register</Button>
                </HStack>
            </Flex>
            <Divider />
        </>
    );
}

export default Navbar;
