import { useToast, Heading, Flex, HStack, Divider, Button, VStack, Accordion, AccordionItem, Avatar, AccordionButton, AccordionPanel, AccordionIcon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGlobalState from "../hooks/useGlobalState";
import Profile from "./Profile";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useGlobalState();
    const toast = useToast();

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
        toast({
            title: "Logged out successfully",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    };

    return (
        <>
            <Flex display={{
                base: "none", md: "flex"
            }} py={3} px={10} justify="space-between" align="center" position="relative">
                <Heading size={"md"} color={"blue.600"}>
                    HealthCheckPro
                </Heading>
                <HStack display={{ base: "none", md: "flex" }} gap={10}>
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
                    {user ? (
                        <Menu>
                            <MenuButton>
                                <Avatar name={user.username} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Profile userInfo={user} />
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <HStack>
                            <Button colorScheme="blue" variant="link" as={Link} to="/login">Login</Button>
                            <Button colorScheme="blue" as={Link} to="/register">Register</Button>
                        </HStack>
                    )}
                </HStack>
            </Flex>

            <Accordion w="100svw" allowToggle display={{ base: "block", md: "none" }} p={3}>
                <AccordionItem w="100%" border="none" >
                    <AccordionButton w="100%" display="flex" justifyContent={"space-between"}>
                        <HStack>
                        <Menu>
                                    <MenuButton>
                                        <Avatar name={user.username} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem >
                                            <Profile userInfo={user} />
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            <Heading size={"md"} color={"blue.600"} p={3}>
                                HealthCheckPro
                            </Heading>
                        </HStack>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={3} as={VStack}>
                        <HStack display="flex" flex={1} w="100%">
                            <Button as={Link} colorScheme="blue" variant="outline" isActive={location.pathname === "/" ? true : false} flex={1} to="/" >Home</Button>
                            <Button as={Link} colorScheme="blue" variant="outline" isActive={location.pathname === "/about" ? true : false} flex={1} to="/about" >About</Button>
                            <Button as={Link} colorScheme="blue" variant="outline" isActive={location.pathname === "/features" ? true : false} flex={1} to="/features" >Features</Button>
                            <Button as={Link} colorScheme="blue" variant="outline" isActive={location.pathname === "/contact" ? true : false} flex={1} to="/contact" >Contact</Button>
                        </HStack>
                        <HStack flex={1} w="100%">
                            {user ? (
                                ""
                            ) : (
                                <>
                                    <Button flex={1} colorScheme="blue" variant="outline" as={Link} to="/login" >Login</Button>
                                    <Button flex={1} colorScheme="blue" as={Link} to="/register" >Register</Button>
                                </>
                            )}
                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            <Divider />
        </>
    );
}

export default Navbar;