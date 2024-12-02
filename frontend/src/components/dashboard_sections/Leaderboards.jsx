import { Avatar, Badge, Box, Grid, GridItem, Heading, HStack, Skeleton, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useCategory from "../../apis/category";
import useLeaderBoard from "../../apis/leaderboard";
import useCustomTheme from "../../hooks/useCustomTheme";

const Leaderboards = () => {
    const { leaderboardGradients, cardBg } = useCustomTheme();
    const { getLeaderBoard, getOverallLeaderBoard, loadingL } = useLeaderBoard();
    const { fetchCategories } = useCategory();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [topRanking, setTopRanking] = useState([]);
    const [leaderboards, setLeaderboards] = useState([]);
    const [overallTopRanking, setOverallTopRanking] = useState([]);
    const [overallLeaderboards, setOverallLeaderboards] = useState([]);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            const res = await fetchCategories();
            if (res) {
                setCategories(res);
                if (res.length > 0) {
                    handleCategoryClick(res[0]._id);
                }
            } else {
                console.log("Error fetching categories");
            }
        };
        fetchCategoriesData();
    }, []);

    const handleCategoryClick = async (categoryId) => {
        setSelectedCategory(categoryId);
        const res = await getLeaderBoard(categoryId);
        if (res.leaderboard.length) {
            const top3 = res.leaderboard.slice(0, 3).map((item, index) => ({
                position: ["1st", "2nd", "3rd"][index],
                user: item.username,
                score: item.score,
            }));

            const rest = res.leaderboard.slice(3).map((item, index) => ({
                place: index + 4,
                user: item.username,
                score: item.score
            }));

            setTopRanking(top3);
            setLeaderboards(rest);
        }
    };

    const handleOverallClick = async () => {
        setSelectedCategory("overall");
        const res = await getOverallLeaderBoard();
        if (res.leaderboard.length) {
            const top3 = res.leaderboard.slice(0, 3).map((item, index) => ({
                position: ["1st", "2nd", "3rd"][index],
                user: item.username,
                score: item.score,
            }));

            const rest = res.leaderboard.slice(3).map((item, index) => ({
                place: index + 4,
                user: item.username,
                score: item.score
            }));

            setOverallTopRanking(top3);
            setOverallLeaderboards(rest);
        }
    };

    return (
        <VStack p={{ base: 0, md: 8 }} mt={5} minH="100svh" gap={6}>
            <Heading as="h2" size="lg" color="blue.600">HealthCheckPro Top Ranking</Heading>
            <Tabs
                variant="soft-rounded"
                index={selectedCategory === "overall" ? categories.length : categories.findIndex(category => category._id === selectedCategory)}
                onChange={(index) => {
                    if (index === categories.length) {
                        handleOverallClick();
                    } else {
                        handleCategoryClick(categories[index]._id);
                    }
                }}
                w="100%"
                h="100%"
                display="flex"
                flexDirection="column"
            >
                <TabList p={3} rounded="full" flexWrap="wrap" justifyContent="center">
                    {categories.length > 0 ? categories.map((category) => (
                        <Tab key={category._id}>
                            {category.categoryName}
                        </Tab>
                    )) : (
                        <Skeleton height="40px" width="100px" />
                    )}
                    <Tab>Overall</Tab>
                </TabList>
                <TabPanels>
                    {categories.length > 0 ? categories.map((category) => (
                        <TabPanel key={category._id}>
                            <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8} overflowX="auto" p={6}>
                                {loadingL ? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <GridItem key={index}>
                                            <Skeleton height="200px" width="100%" />
                                        </GridItem>
                                    ))
                                ) : (
                                    topRanking.length > 0 ? topRanking.map((item, index) => (
                                        <GridItem key={index} bg={leaderboardGradients[index] || leaderboardGradients.default} p={6} borderRadius="lg" textAlign="center" boxShadow="lg">
                                            <HStack justifySelf="center" align="center" gap={5}>
                                                <Badge colorScheme="blue" variant="solid" rounded="full" p={2} fontSize="1.2em">{item.position}</Badge>
                                                <Avatar mt={4} mb={2} name={item.user} />
                                            </HStack>
                                            <Text fontWeight="bold" fontSize="1.5em">
                                                {item.user}
                                            </Text>
                                            <Text fontSize="1.2em" color="gray.500">
                                                Score: {item.score}
                                            </Text>
                                        </GridItem>
                                    )) : (
                                        <Skeleton height="200px" width="100%" />
                                    )
                                )}
                            </Grid>

                            <Table variant="simple" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Place</Th>
                                        <Th>User</Th>
                                        <Th isNumeric>Score</Th>
                                    </Tr>
                                </Thead>
                            </Table>
                            <Box h="500px" overflowY="auto" >
                                <Table variant="simple" size="md" bg="Background">
                                    <Tbody>
                                        {loadingL ? (
                                            Array.from({ length: 10 }).map((_, index) => (
                                                <Tr key={index}>
                                                    <Td><Skeleton height="20px" /></Td>
                                                    <Td><Skeleton height="20px" /></Td>
                                                    <Td><Skeleton height="20px" /></Td>
                                                </Tr>
                                            ))
                                        ) : (
                                            leaderboards.length > 0 ? leaderboards.map((rank, index) => (
                                                <Tr key={index}>
                                                    <Td>{rank.place}</Td>
                                                    <Td>{rank.user}</Td>
                                                    <Td isNumeric>{rank.score}</Td>
                                                </Tr>
                                            )) : (
                                                Array.from({ length: 10 }).map((_, index) => (
                                                    <Tr key={index}>
                                                        <Td><Skeleton height="20px" /></Td>
                                                        <Td><Skeleton height="20px" /></Td>
                                                        <Td><Skeleton height="20px" /></Td>
                                                    </Tr>
                                                ))
                                            )
                                        )}
                                    </Tbody>
                                </Table>
                            </Box>
                        </TabPanel>
                    )) : (
                        <TabPanel>
                            <Skeleton height="200px" width="100%" />
                        </TabPanel>
                    )}
                    <TabPanel>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8} overflowX="auto" p={6}>
                            {loadingL ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <GridItem key={index}>
                                        <Skeleton height="200px" width="100%" />
                                    </GridItem>
                                ))
                            ) : (
                                overallTopRanking.length > 0 ? overallTopRanking.map((item, index) => (
                                    <GridItem key={index} bg={leaderboardGradients[index] || leaderboardGradients.default} p={6} borderRadius="lg" textAlign="center" boxShadow="lg">
                                        <HStack justifySelf="center" align="center" gap={5}>
                                            <Badge colorScheme="yellow" variant="solid" rounded="full" p={2} fontSize="1.2em">{item.position}</Badge>
                                            <Avatar mt={4} mb={2} name={item.user} />
                                        </HStack>
                                        <Text fontWeight="bold" fontSize="1.5em">
                                            {item.user}
                                        </Text>
                                        <Text fontSize="1.2em" color="gray.500">
                                            Score: {item.score}
                                        </Text>
                                    </GridItem>
                                )) : (
                                    <Skeleton height="200px" width="100%" />
                                )
                            )}
                        </Grid>

                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    <Th>Place</Th>
                                    <Th>User</Th>
                                    <Th isNumeric>Score</Th>
                                </Tr>
                            </Thead>
                        </Table>
                        <Box h="500px" overflowY="auto"  >
                            <Table variant="simple" size="md" bg="Background">
                                <Tbody>
                                    {loadingL ? (
                                        Array.from({ length: 10 }).map((_, index) => (
                                            <Tr key={index}>
                                                <Td><Skeleton height="20px" /></Td>
                                                <Td><Skeleton height="20px" /></Td>
                                                <Td><Skeleton height="20px" /></Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        overallLeaderboards.length > 0 ? overallLeaderboards.map((rank, index) => (
                                            <Tr key={index}>
                                                <Td>{rank.place}</Td>
                                                <Td>{rank.user}</Td>
                                                <Td isNumeric>{rank.score}</Td>
                                            </Tr>
                                        )) : (
                                            Array.from({ length: 10 }).map((_, index) => (
                                                <Tr key={index}>
                                                    <Td><Skeleton height="20px" /></Td>
                                                    <Td><Skeleton height="20px" /></Td>
                                                    <Td><Skeleton height="20px" /></Td>
                                                </Tr>
                                            ))
                                        )
                                    )}
                                </Tbody>
                            </Table>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    );
};

export default Leaderboards;
