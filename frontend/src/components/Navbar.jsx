import { useToast, Heading, Flex, HStack,IconButton, Divider, Button, VStack, Accordion, AccordionItem, Avatar, AccordionButton, AccordionPanel, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from 'react-scroll';
import useGlobalState from "../hooks/useGlobalState";
import Profile from "./Profile";
import ChangeTheme from "./ChangeTheme";
import useCustomTheme from "../hooks/useCustomTheme";
import { IoPersonAdd } from "react-icons/io5";
 // Import your logo here
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {

    const navigate = useNavigate();
    const { user, setUser } = useGlobalState();
    const toast = useToast();
    const [activeSection, setActiveSection] = useState('');
    const { navBg, appLogo } = useCustomTheme();

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

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        console.log('=== sections Navbar.jsx [34] ===', sections);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <>
            <Flex display={{
                base: "none", md: "flex"
            }} py={3} px={10} justify="space-between" align="center" position="fixed" zIndex={5} bg={
                navBg
            } left={0} right={0}>
                <Image src={appLogo} boxSize={70}/>
                <HStack display={{ base: "none", md: "flex" }} gap={10}>
                    <Button as={ScrollLink} to="home" smooth={true} duration={500} variant="link" transition={{

                    }} isActive={activeSection === 'home'} fontWeight={activeSection === 'home' ? 'bold' : 'normal'}>
                        Home
                    </Button>
                    <Button as={ScrollLink} to="features" smooth={true} duration={500} variant="link" isActive={activeSection === 'features'} fontWeight={activeSection === 'features' ? 'bold' : 'normal'}>
                        Features
                    </Button>
                    <Button as={ScrollLink} to="about" smooth={true} duration={500} variant="link" isActive={activeSection === 'about'} fontWeight={activeSection === 'about' ? 'bold' : 'normal'}>
                        About
                    </Button>
                    <Button as={ScrollLink} to="contact" smooth={true} duration={500} variant="link" isActive={activeSection === 'contact'} fontWeight={activeSection === 'contact' ? 'bold' : 'normal'}>
                        Contact
                    </Button>
                    {user ? (
                        <HStack>
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
                        </HStack>
                    ) : (
                        <HStack >
                            <IconButton icon={<IoPersonAdd />} colorScheme="blue" variant="outline" as={Link} to="/login" />
                        </HStack>
                    )}
                    <ChangeTheme />
                </HStack>
            </Flex>

            <Accordion w="100svw" position="fixed" zIndex={5} bgColor={navBg} allowToggle display={{ base: "block", md: "none" }} >
                <AccordionItem w="100%" border="none">
                    {({ isExpanded }) => (<>
                        <HStack pr={3}>
                            <AccordionButton w="100%" display="flex" justifyContent="space-between" >
                                <Image src={appLogo} boxSize="80px" alt="Logo" /> {/* Mobile logo */}
                                <IconButton variant="ghost" colorScheme="blue" size="lg">{isExpanded ? <CloseIcon /> : <HamburgerIcon />}</IconButton>
                            </AccordionButton>

                        </HStack>
                        <AccordionPanel px={3} flex={1} as={VStack} w="100%">
                            <HStack display="flex"  w="100%" >
                                <Button flex={1} as={ScrollLink} colorScheme="blue" variant="outline" to="home" smooth={true} duration={500} isActive={activeSection === 'home'} fontWeight={activeSection === 'home' ? 'bold' : 'normal'}>Home</Button>
                                <Button flex={1} as={ScrollLink} colorScheme="blue" variant="outline" to="about" smooth={true} duration={500} isActive={activeSection === 'about'} fontWeight={activeSection === 'about' ? 'bold' : 'normal'}>About</Button>
                                <Button flex={1} as={ScrollLink} colorScheme="blue" variant="outline" to="features" smooth={true} duration={500} isActive={activeSection === 'features'} fontWeight={activeSection === 'features' ? 'bold' : 'normal'}>Features</Button>
                                <Button flex={1} as={ScrollLink} colorScheme="blue" variant="outline" to="contact" smooth={true} duration={500} isActive={activeSection === 'contact'} fontWeight={activeSection === 'contact' ? 'bold' : 'normal'}>Contact</Button>
                            </HStack>

                            {user ? (
                                ""
                            ) : (
                                <VStack mt={3} width="100%">
                                    <Button width="100%" colorScheme="blue" variant="outline" as={Link} to="/login" >Login</Button>
                                    <Button width="100%" colorScheme="blue" as={Link} to="/register" >Register</Button>
                                </VStack>
                            )}

                            <ChangeTheme />
                        </AccordionPanel></>)}
                </AccordionItem>
            </Accordion>

            <Divider />
        </>
    );
}

export default Navbar;