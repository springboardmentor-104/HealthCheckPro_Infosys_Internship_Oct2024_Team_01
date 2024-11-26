
import { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Stack, SimpleGrid, Button, Tag, HStack, Image, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Skeleton } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import useCustomTheme from '../../../hooks/useCustomTheme';
import image from '../../../assets/doctor.png';
import useAssessment from '../../../apis/assessment';
import HealthStatus from './HealthStatus';
import CategoryCard from './CategoryCard';
import Suggesstions from './Suggesstions';


const Report = ({
    attempt,
    loading,
}) => {


    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [resLoading, setResLoading] = useState(false);
    const [userResponses, setUserResponses] = useState([]);
    const { fetchCategoryByAttempt } = useAssessment();
    const { cardBg } = useCustomTheme();

    // Handle category click
    const handleCategoryClick = async (categoryId) => {
        setResLoading(true);
        setSelectedCategory(categoryId);
        const responses = await fetchCategoryByAttempt(attempt._id, categoryId)
        .finally(() => setResLoading(false));
        responses && setUserResponses(responses.userResponse.questions);
    }


    useEffect(() => {
        const categories = attempt.assessments.map((category) => {
            return {
                categoryId: category.categoryId,
                categoryName: category.categoryName
            };
        });
        setCategories(categories);
        handleCategoryClick(categories[0].categoryId);


    }, []);



    return (
        <Box p={5} rounded="md" mt={5} >
            <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" alignItems="center" gap={3}>
                <Heading color="blue.600" textAlign={{
                    base: 'center',
                    md: 'left'
                }}>
                    Health Report
                </Heading>
                <Stack direction={{ base: 'column', md: 'row' }} gap={3}>

                    <Button as={ScrollLink} to='report' smooth={true} duration={500} variant="ghost" size="sm" colorScheme="blue">View Suggestions</Button>

                    <Tag colorScheme="blue" variant="solid" size="lg">
                        Attempt Number: {attempt.attemptNumber}
                    </Tag>
                    <Tag size="lg" variant="outline" colorScheme="blue">
                        Date: {new Date(attempt.date).toLocaleDateString()}
                    </Tag>
                </Stack>
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }} width="100%" h="100%" flex={1} mt={5} gap={5} >
                <SimpleGrid flex={1} position="relative" columns={[1, 2, 3]} gap={6}>
                    <Skeleton isLoaded={!loading}>
                        <CategoryCard category={{ categoryName: 'Overall', totalScore: attempt.overallScore, maxScore: attempt.overallMaxScore }} />
                    </Skeleton>
                    {attempt.assessments.map((category, index) => (
                        <Skeleton key={index} isLoaded={!loading}>
                            <CategoryCard category={category} />
                        </Skeleton>
                    ))}
                </SimpleGrid>
            </Stack>

            <Box mt={10} id='report'>
                <Skeleton isLoaded={!loading}>
                    <Heading mb={5} size="lg" color="blue.600" textAlign={{
                        base: 'center',
                        md: 'left'
                    }}>Report Summary</Heading>
                    <HealthStatus score={attempt.overallScore} tot={attempt.overallMaxScore} />
                    <Stack direction={{ base: 'column', md: 'row' }} p={5} bg={cardBg} rounded="md" boxShadow="md">
                        <Box flex={1}>
                            <Heading size="md" mb={3}>
                                Insights
                            </Heading>
                            <Text>
                                <Suggesstions assessments={attempt.assessments} />
                            </Text>
                        </Box>
                        <Box>
                            <Image src={image} w="200px" />
                        </Box>
                    </Stack>
                </Skeleton>
            </Box>
            <Box mt={5} bg={cardBg} p={6} rounded="md" shadow="md">
                <Heading color="blue.600">Your Responses and Our Advice</Heading>
                <Box mt={5}>
                    <HStack spacing={4} wrap="wrap" justify={{
                        base: 'center',
                        md: 'flex-start'
                    }}>
                        {categories.map((category, index) => (
                            <Button
                                key={index}
                                colorScheme="blue"
                                variant={selectedCategory === category.categoryId ? 'solid' : 'outline'}
                                onClick={() => handleCategoryClick(category.categoryId)}
                            >
                                {category.categoryName}
                            </Button>
                        ))}
                    </HStack>
                    <Box mt={5}>
                        <Skeleton isLoaded={
                            !loading && !resLoading
                        }>
                            <Accordion allowToggle>
                                {userResponses.map((response, responseIndex) => (
                                    <AccordionItem key={responseIndex}>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex="1" textAlign="left">
                                                    {response.questionText}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <Text>Your Response: {response.selectedOptionText}</Text>
                                            <Heading size="md" color="blue.500">Advice: {response.advice}</Heading>
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Skeleton>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}


Report.propTypes = {
    attempt: PropTypes.object,
    loading: PropTypes.bool,
};

export default Report;


