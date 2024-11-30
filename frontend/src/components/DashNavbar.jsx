import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Button,
    Heading, HStack,
    VStack,
    Image,
    Box
} from "@chakra-ui/react";
import useCustomTheme from "../hooks/useCustomTheme";

import { Link as NLink, useLocation, useNavigate } from "react-router-dom";
import useGlobalState from "../hooks/useGlobalState";
import ChangeTheme from "./ChangeTheme";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const DashNavbar = () => {
    const { setUser } = useGlobalState();
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }
    const location = useLocation();
    const { navBg,appLogo } = useCustomTheme();
    return (
        <>
            <HStack display={{
                base: "none",
                md: "flex"
            }}
                bgColor={navBg}
                zIndex={9999}  px={10} w="100%" justify="space-between" top={0}  >

                <HStack>
                    <Button variant="link" onClick={() => {
                        navigate('/')
                    }}>
                        <Image src={appLogo} boxSize={70} />
                    </Button>
                </HStack>
                <Button colorScheme="blue" variant="ghost"></Button>
                <HStack>
                    <Button as={NLink} to="/dashboard/" colorScheme="blue" variant="ghost">Dashboard</Button>
                    <Button as={NLink} to="/dashboard/leaderboard" colorScheme="blue" variant="ghost">Leaderboard</Button>
                    <Button variant="outline" colorScheme="red" onClick={handleLogout}>Logout</Button>
                    <ChangeTheme />
                </HStack>

            </HStack>

            <Accordion w="100svw" zIndex={9999} bgColor={navBg} allowToggle display={{ base: "block", md: "none" }}  borderColor="gray.100">
                <AccordionItem w="100%" border="none">
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton w="100%" display="flex">
                                <HStack flex={1}>
                                    <Image src={appLogo} boxSize={70} />
                                    <Heading size="md" color="blue.600" p={3}>
                                        {
                                            location.pathname === "/dashboard/" ? "Dashboard" :
                                                location.pathname === "/dashboard/assessment" ? "Assessment" :
                                                    location.pathname === "/dashboard/leaderboard" ? "Leaderboard" : "Dashboard"
                                        }
                                    </Heading>
                                </HStack>

                                <Box  color="blue.500" fontSize="2xl" mr={3} fontWeight="900">
                                    {isExpanded ? (
                                        <CloseIcon />
                                    ) : (
                                        <HamburgerIcon  />
                                    )}
                                </Box>
                            </AccordionButton>
                            <AccordionPanel px={3} as={VStack} flex={1} w="100%">
                                <HStack display="flex" flex={1} w="full">
                                    <Button as={NLink} flex={1} to="/dashboard/" colorScheme="blue" variant="outline">Dashboard</Button>
                                    <Button as={NLink} flex={1} to="/dashboard/leaderboard" colorScheme="blue" variant="outline">Leaderboards</Button>
                                    <ChangeTheme />
                                </HStack>
                                <Button w="100%" as={NLink} onClick={handleLogout} colorScheme="red" variant="solid">Logout</Button>
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default DashNavbar;