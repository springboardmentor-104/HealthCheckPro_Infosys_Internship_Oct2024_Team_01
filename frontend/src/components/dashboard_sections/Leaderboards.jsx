import { useState, useEffect } from "react";
import { Box, Heading, Table, Tbody, Tr, Td, Text, Thead, Th, HStack, Tabs, TabList, Tab, TabPanels, TabPanel, useToast, Grid, GridItem, Badge, Avatar, Button, VStack,Skeleton } from "@chakra-ui/react";
import useCustomTheme from "../../hooks/useCustomTheme";
import useLeaderBoard from "../../hooks/useLeaderBoard";
import useGlobalState from "../../hooks/useGlobalState";
import useCategory from "../../hooks/useCategory";

const Leaderboards = () => {
    const { user } = useGlobalState();
    const { leaderboardGradients, cardBg } = useCustomTheme();
    const { getLeaderBoard,loadingL } = useLeaderBoard(user.token);
    const { fetchCategories } = useCategory();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [topRanking, setTopRanking] = useState([]);
    const [leaderboards, setLeaderboards] = useState([]);
    const toast = useToast();

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
                position: ["First", "Second", "Third"][index],
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

    return (
        <VStack p={{
            base: 1,
            md: 8
        }} mt={{
            base: 40,
            md: 20
        }} minH="100svh" gap={6}>
            <Heading as="h2" size="lg" color="blue.600">HealthCheckPro Top Ranking</Heading>
            <Tabs
                variant="soft-rounded"
                index={categories.findIndex(category => category._id === selectedCategory)}
                onChange={(index) => handleCategoryClick(categories[index]._id)}
                w="100%"
                h="100%"
                display="flex"
                flexDirection="column"
                p={5}
            >
                <TabList p={3} rounded="full" flexWrap="wrap">
                    {categories.length > 0 ? categories.map((category) => (
                        <Tab key={category._id}>
                            {category.categoryName}
                        </Tab>
                    )) : (
                        <Skeleton height="40px" width="100px" />
                    )}
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
                                                <Badge colorScheme="yellow" variant="solid" rounded="full" p={2} fontSize="1.2em">{item.position}</Badge>
                                                <Avatar mt={4} mb={2} />
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
                            <Box h="500px" overflowY="auto" bg={cardBg} rounded="md">
                                <Table variant="simple" size="sm">
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
                </TabPanels>
            </Tabs>
        </VStack>
    );
};

export default Leaderboards;
