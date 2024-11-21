import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Button,
    Heading, HStack,
    VStack,
    Image
} from "@chakra-ui/react";
import useCustomTheme from "../hooks/useCustomTheme";

import { Link as NLink, useLocation, useNavigate } from "react-router-dom";
import useGlobalState from "../hooks/useGlobalState";

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
                zIndex={9999} py={3} px={10} w="100%" justify="space-between" position="fixed" top={0}  >

                <HStack>
                <Image src={appLogo} boxSize={70}/>
                </HStack>
                <Button colorScheme="blue" variant="ghost"></Button>
                <HStack>
                    <Button as={NLink} to="/dashboard/" colorScheme="blue" variant="ghost">Dashboard</Button>
                    <Button as={NLink} to="/dashboard/leaderboard" colorScheme="blue" variant="ghost">Leaderboard</Button>
                    <Button variant="outline" colorScheme="red" onClick={handleLogout}>Logout</Button>
                </HStack>

            </HStack>

            <Accordion w="100svw" position="fixed" zIndex={9999} bgColor={navBg} allowToggle display={{ base: "block", md: "none" }} p={3} borderColor="gray.100">
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