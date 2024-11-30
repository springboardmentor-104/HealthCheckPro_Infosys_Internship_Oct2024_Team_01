import {
    Box,
    Button,
    CircularProgress,
    Flex, Heading,
    HStack,
    Image,
    Tag,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAssessment from '../../../apis/assessment';
import useCustomTheme from '../../../hooks/useCustomTheme';
import NWImg from '../../../assets/banner-nr1.gif';
import NewLoginLogo from '../../../assets/illustrations/newl-3.gif';
import { useNavigate } from 'react-router-dom';
import Report from './Report';
import AttemptHistory from './AttemptHistory';


const HealthDetails = () => {

    const { fetchAssessmentStatus, fetchLatestAssessment, startNewRound, fetchAssessmentHistory } = useAssessment();
    const [status, setStatus] = useState(null);
    const [latestAssessment, setLatestAssessment] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cardBg, bgOverlay } = useCustomTheme();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const status = await fetchAssessmentStatus();
            setStatus(status);

            const latest = await fetchLatestAssessment()
            setLatestAssessment(latest);

            const history = await fetchAssessmentHistory();
            setAttempts(history.slice(1));

            setLoading(false);
        }
        fetchData();
    }, []);

    // Handle starting a new round
    const handleStartRound = async () => {
        await startNewRound();
    }

    // Handle redirect to assessment attempt
    const handleRedirect = () => {
        navigate(`/assessment/attempt/${latestAssessment?.latestIncompleteAttempt._id}`);
    }



    return (
        <>{
            status ? <Box w="100%" >
                {status?.attemptNumber > 0 ? (
                    <>
                        {!status.isComplete ? (
                            <Box  p={10} >
                                <Box rounded="md" p={5} bgColor={cardBg}><Flex justify="space-between">
                                    <HStack gap={5} w="full" justify="flex-end">
                                        <Tag colorScheme="red">Attempt Number: {status.attemptNumber}</Tag>
                                    </HStack>
                                </Flex>
                                    <VStack mt={5} gap={5} p={5}>
                                        <Box>
                                            <Heading size="md">Completed Categories</Heading>
                                            {status.completedCategories.length > 0 ? (
                                                status.completedCategories.map((category, index) => (
                                                    <Tag key={index} colorScheme="red" m={1}>
                                                        {category.categoryName}
                                                    </Tag>
                                                ))
                                            ) : (
                                                <Text>No categories completed yet.</Text>
                                            )}
                                        </Box>
                                        {!status.isComplete && (
                                            <Button colorScheme="red" onClick={handleRedirect}>
                                                Continue Assessment
                                            </Button>
                                        )}
                                    </VStack></Box>
                            </Box>
                        ) : (

                            <Box w="100%" overflow="hidden" bg={cardBg} boxShadow="lg" textAlign="center" bgImage={NWImg} bgSize="cover" bgRepeat="no-repeat" >

                                <Box p="80px" bgColor={bgOverlay}>
                                    <Heading size="lg" mb={3}>
                                        Ready for a New Challenge?
                                    </Heading>
                                    <Text fontSize="md" mb={5} color="white">
                                        Start a new round to continue improving your health and track your progress.
                                    </Text>
                                    <Button colorScheme="blue" size="lg" onClick={handleStartRound}>
                                        Start New Round

                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {latestAssessment?.latestCompleteAttempt && (
                            <Report
                                attempt={latestAssessment.latestCompleteAttempt}
                                loading={loading}
                            />
                        )}

                        {attempts.length > 0 && <AttemptHistory attempts={attempts} loading={loading} />}

                    </>
                ) : (
                    <Flex w="100%" h="100vh" alignItems="center" justifyContent="center"  p={5}>
                        <VStack spacing={8} textAlign="center">
                            <Image src={NewLoginLogo} alt="Welcome" boxSize="300px" />
                            <Box>
                                <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                                    Welcome to HealthCheckPro!
                                </Text>
                                <Text fontSize="lg" color="gray.600" mt={3}>
                                    We&apos;re excited to have you here. Let&apos;s get started on your journey to better health.
                                </Text>
                            </Box>
                            <Button mt={5} colorScheme="blue" size="lg" onClick={startNewRound}>
                                Start Your First Health Assessment

                            </Button>
                        </VStack>
                    </Flex>
                )}
            </Box> : <Box h="100%" display="grid" placeItems="center">
                <CircularProgress
                    isIndeterminate
                    color="blue.600"
                    size="50px"
                    thickness="10px"

                />

            </Box>}


        </>
    );
}

HealthDetails.propTypes = {
    latestCompleteAttempt: PropTypes.shape({
        attemptNumber: PropTypes.number,
        date: PropTypes.string,
        overallScore: PropTypes.number,
        assessments: PropTypes.arrayOf(
            PropTypes.shape({
                categoryName: PropTypes.string,
                totalScore: PropTypes.number
            })
        )
    }),
    cardBg: PropTypes.string
};


export default HealthDetails;
