import { Box, Heading, Grid, GridItem, Badge, Avatar, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack } from "@chakra-ui/react";
import useCustomTheme from "../../hooks/useCustomTheme";

const Leaderboards = () => {
    const { leaderboardGradients } = useCustomTheme();
    const topRanking = [
        { position: "First", user: "Peter Jay Smith", score: "19.800", prize: "9.800" },
        { position: "Second", user: "Peter Jay Smith", score: "19.800", prize: "9.800" },
        { position: "Third", user: "Peter Jay Smith", score: "19.800", prize: "9.800" },
    ];

    const rankings = [
        { place: 4, user: "Yeremias NJ", credit: "13.200" },
        { place: 5, user: "John Pentol", credit: "13.200" },
        { place: 6, user: "Magda Hera", credit: "13.200" },
        { place: 7, user: "Danielad Dan", credit: "13.200" },
        { place: 8, user: "Henry", credit: "13.200" },
        { place: 9, user: "Thomas C", credit: "13.200" },
        { place: 10, user: "Jenny", credit: "13.200" },
        { place: 11, user: "Alice Wonderland", credit: "12.900" },
        { place: 12, user: "Bob Builder", credit: "12.800" },
        { place: 13, user: "Charlie Brown", credit: "12.700" },
        { place: 14, user: "Diana Prince", credit: "12.600" },
        { place: 15, user: "Eve Adams", credit: "12.500" },
    ];

    return (
        <Box p={8} mt={20}>
            <Heading as="h2" size="lg" color="blue.600" mb={6}>HealthCheckPro Top Ranking</Heading>

            {/* Top 3 Ranking Cards */}
            <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8} >
                {topRanking.map((item, index) => (
                    <GridItem key={index}bg={leaderboardGradients[index] || leaderboardGradients.default} p={6} borderRadius="lg" textAlign="center" boxShadow="lg">
                        <HStack justifySelf="center" align="center" gap={5}><Badge colorScheme="yellow" variant="solid" rounded="full" p={2} fontSize="1.2em">{item.position}</Badge>
                            <Avatar mt={4} mb={2} /></HStack>
                        <Text fontWeight="bold" fontSize="1.5em">
                            {item.user}
                        </Text>
                        <Text fontSize="1.2em" color="gray.500">
                            Score: {item.score}
                        </Text>

                    </GridItem>
                ))}
            </Grid>

            {/* Leaderboard Tabs */}
            <Tabs variant="soft-rounded" colorScheme="blue">
                <TabList>
                    <Tab>All Time</Tab>
                    <Tab>Week</Tab>
                    <Tab>Month</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {/* Ranking Table */}
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Place</Th>
                                        <Th>User</Th>
                                        <Th isNumeric>Credit</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {rankings.map((ranking, index) => (
                                        <Tr key={index}>
                                            <Td>{ranking.place}</Td>
                                            <Td>{ranking.user}</Td>
                                            <Td isNumeric>{ranking.credit}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <Text>Weekly Rankings will go here...</Text>
                    </TabPanel>
                    <TabPanel>
                        <Text>Monthly Rankings will go here...</Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}


export default Leaderboards;