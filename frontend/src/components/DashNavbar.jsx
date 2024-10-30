import {
    Avatar, Heading, HStack, Button,
    Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, VStack
} from "@chakra-ui/react";
import useCustomTheme from "../hooks/useCustomTheme";

import {Link as NLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGlobalState from "../hooks/useGlobalState";

const DashNavbar = () => {
    const { setUser } = useGlobalState();
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    }
    const { navBg } = useCustomTheme();
    return (

        <><HStack display={{
            base: "none",
            md: "flex"
        }}
            bgColor={navBg}
            zIndex={3} py={3} px={10} w="100%" justify="space-between" position="fixed" top={0}  >

            <HStack color="blue.600"><Avatar size="md" /> <Heading size="md" >John Doe</Heading></HStack>
            <Button colorScheme="blue" variant="ghost"></Button>
            <HStack>
                <Button as={NLink} to="/dashboard/" colorScheme="blue" variant="ghost">Overview</Button>
                <Button as={NLink} to="/dashboard/assessment" colorScheme="blue" variant="ghost">Assessment</Button>
                <Button as={NLink} to="/dashboard/leaderboard" colorScheme="blue" variant="ghost">Leaderboard</Button>
                <Button onClick={handleLogout}  colorScheme="red" variant="solid">Logout</Button>
                </HStack>

        </HStack>

            <Accordion w="100svw" position="fixed" zIndex={5} bgColor={navBg} allowToggle display={{ base: "block", md: "none" }} p={3} borderColor="gray.100">
                <AccordionItem w="100%" border="none">
                    <AccordionButton w="100%" display="flex">
                        <HStack>
                            <Avatar size="md" />
                            <Heading size="md" color="blue.600" p={3}>
                                Ashish Vaidya
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