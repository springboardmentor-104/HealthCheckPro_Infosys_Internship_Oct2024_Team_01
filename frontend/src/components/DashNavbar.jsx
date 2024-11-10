import {
    Avatar, Heading, HStack, Button,
    Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react";
import useCustomTheme from "../hooks/useCustomTheme";

import { Link as NLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import useGlobalState from "../hooks/useGlobalState";

const DashNavbar = () => {
    const { setUser, user } = useGlobalState();
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }
    const location = useLocation();
    const { navBg } = useCustomTheme();
    return (
        <>
            <HStack display={{
                base: "none",
                md: "flex"
            }}
                bgColor={navBg}
                zIndex={3} py={3} px={10} w="100%" justify="space-between" position="fixed" top={0}  >

                <HStack><Heading size={"md"} color={"blue.600"}>
                    HealthCheckPro
                </Heading></HStack>
                <Button colorScheme="blue" variant="ghost"></Button>
                <HStack>
                    <Button as={NLink} to="/dashboard/assessment" colorScheme="blue" variant="ghost">Assessment</Button>
                    <Button as={NLink} to="/dashboard/" colorScheme="blue" variant="ghost">Overview</Button>
                    <Button as={NLink} to="/dashboard/leaderboard" colorScheme="blue" variant="ghost">Leaderboard</Button>

                    <Menu>
                        <MenuButton as={IconButton} aria-label="Profile" icon={<Avatar size="sm" name={user.username} />} />
                        <MenuList p={2} as={VStack}>
                            <Button colorScheme="blue" w="full" as={NLink}>Profile</Button>
                            <Button variant="outline" colorScheme="red" w="full" onClick={handleLogout}>Logout</Button>
                        </MenuList>
                    </Menu>
                </HStack>

            </HStack>

            <Accordion w="100svw" position="fixed" zIndex={5} bgColor={navBg} allowToggle display={{ base: "block", md: "none" }} p={3} borderColor="gray.100">
                <AccordionItem w="100%" border="none">
                    <AccordionButton w="100%" display="flex">
                        <HStack>
                            <Avatar size="md" />
                            <Heading size="md" color="blue.600" p={3}>
                                {
                                    location.pathname === "/dashboard/" ? "Overview" :
                                        location.pathname === "/dashboard/assessment" ? "Assessment" :
                                            location.pathname === "/dashboard/leaderboard" ? "Leaderboard" : "Dashboard"
                                }
                            </Heading>
                        </HStack>
                        <AccordionIcon ml="auto" />
                    </AccordionButton>
                    <AccordionPanel px={3} as={VStack} flex={1} w="100%">
                        <HStack display="flex" flex={1} w="full">
                            <Button as={NLink} to="/dashboard/" colorScheme="blue" variant="outline">Overview</Button>
                            <Button as={NLink} to="/dashboard/assessment" colorScheme="blue" variant="outline">Assessment</Button>
                            <Button as={NLink} to="/dashboard/leaderboard" colorScheme="blue" variant="outline">Leaderboards</Button>
                        </HStack>
                        <Button w="100%" as={NLink} onClick={handleLogout} colorScheme="red" variant="solid">Logout</Button>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default DashNavbar;