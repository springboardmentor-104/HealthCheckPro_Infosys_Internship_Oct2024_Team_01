// Desc: Navbar component for the application
// Reference: https://v2.chakra-ui.com/docs/layout/
// Reference for Link,useLocation and useNavigate: https://reactrouter.com/en/main


import { Heading, Flex, HStack, Divider, Button, Avatar,Menu,MenuList,MenuItem,MenuButton } from "@chakra-ui/react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Language from "./Language";
import useGlobalState from "../hooks/useGlobalState";
import Profile from "./Profile";


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user,setUser } = useGlobalState();

    return (
        <>
            <Flex py={3} px={10} justify="space-between" align="center" position="relative">
                <Heading size={"md"} color={"blue.600"}>
                    HealthCheckPro
                </Heading>
                <HStack gap={10} >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ textDecoration: 'underline', textDecorationColor: location.pathname === '/' ? 'blue' : 'transparent', textUnderlineOffset: '4px', transition: 'text-decoration-color 0.3s', fontWeight: location.pathname === '/' ? 'bold' : 'normal' }} onMouseEnter={(e) => e.target.style.textDecorationColor = 'blue'} onMouseLeave={(e) => e.target.style.textDecorationColor = location.pathname === '/' ? 'blue' : 'transparent'}>Home</span>
                    </Link>

                    <Link to="/features" style={{ textDecoration: 'none' }}>
                        <span style={{ textDecoration: 'underline', textDecorationColor: location.pathname === '/features' ? 'blue' : 'transparent', textUnderlineOffset: '4px', transition: 'text-decoration-color 0.3s', fontWeight: location.pathname === '/features' ? 'bold' : 'normal' }} onMouseEnter={(e) => e.target.style.textDecorationColor = 'blue'} onMouseLeave={(e) => e.target.style.textDecorationColor = location.pathname === '/features' ? 'blue' : 'transparent'}>Features</span>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <span style={{ textDecoration: 'underline', textDecorationColor: location.pathname === '/contact' ? 'blue' : 'transparent', textUnderlineOffset: '4px', transition: 'text-decoration-color 0.3s', fontWeight: location.pathname === '/contact' ? 'bold' : 'normal' }} onMouseEnter={(e) => e.target.style.textDecorationColor = 'blue'} onMouseLeave={(e) => e.target.style.textDecorationColor = location.pathname === '/contact' ? 'blue' : 'transparent'}>Contact</span>
                    </Link>
                    <Link to="/about" style={{ textDecoration: 'none' }}>
                        <span style={{ textDecoration: 'underline', textDecorationColor: location.pathname === '/about' ? 'blue' : 'transparent', textUnderlineOffset: '4px', transition: 'text-decoration-color 0.3s', fontWeight: location.pathname === '/about' ? 'bold' : 'normal' }} onMouseEnter={(e) => e.target.style.textDecorationColor = 'blue'} onMouseLeave={(e) => e.target.style.textDecorationColor = location.pathname === '/about' ? 'blue' : 'transparent'}>About</span>
                    </Link>
                    <Language />
                    {!user ? (
                        <>
                            <Button colorScheme="blue" variant="link" as={Link} to="/login">Login</Button>
                            <Button colorScheme="blue" as={Link} to="/register">Register</Button>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton as={Button} variant="outline" rounded="full" colorScheme="blue" p={0} m={0}>
                                <Avatar size="sm" name={user?.username} />
                            </MenuButton>
                            <MenuList p={3}>
                                <MenuItem as={Button} >
                                <Profile userInfo={user}/>
                                </MenuItem>
                                <MenuItem as={Button} onClick={() => {
                                    localStorage.removeItem('user');
                                    setUser(null);
                                    navigate('/login');
                                }}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </HStack>
            </Flex>
            <Divider />
        </>
    )
}

export default Navbar;