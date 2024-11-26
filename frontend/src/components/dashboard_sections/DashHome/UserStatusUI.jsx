import {
    Box,
    Button,
    CircularProgress,
    CircularProgressLabel,
    Flex, Heading,
    HStack,
    Image,
    Skeleton,
    Tag,
    Text,
    VStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,

} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import useAssessment from '../../../apis/assessment';

import useCustomTheme from '../../../hooks/useCustomTheme';

import NWImg from '../../../assets/banner-nr1.gif';
import NewLoginLogo from '../../../assets/illustrations/newl-3.gif';

import {

    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

import Report from './Report';


const UserStatusUI = () => {

    const { fetchAssessmentStatus, fetchLatestAssessment, startNewRound, fetchAssessmentHistory, fetchAttemptById } = useAssessment();
    const [status, setStatus] = useState(null);
    const [latestAssessment, setLatestAssessment] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cardBg, bgOverlay, bodyBg } = useCustomTheme();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalProps, setModalProps] = useState(null);



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

    }


    const handleViewReport = async (id) => {
        // console.log('View Report');
        const res = await fetchAttemptById(id);
        res && setModalProps(res.attempt);
        onOpen();
    }


    return (
        <><Box w="100%" >
            {status?.attemptNumber > 0 ? (
                <>
                    {!status.isComplete ? (
                        <Box bgColor={cardBg} p={5} rounded="md">
                            <Flex justify="space-between">
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
                            </VStack>
                        </Box>
                    ) : (

                        <Box w="100%" overflow="hidden" bg={cardBg} rounded={{
                            base: 'none',
                            md: 'md'
                        }} boxShadow="lg" textAlign="center" bgImage={NWImg} bgSize="cover" bgRepeat="no-repeat" >

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

                    {attempts.length > 0 && <><Heading textAlign={{
                        base: 'center',
                        md: 'left'
                    }} mb={5} color="blue.600">Assessment History</Heading>
                        <Box w="100%" h="500px" rounded="md" mt={5} p={5} overflowY="auto" bg={cardBg}>
                            <Skeleton isLoaded={!loading}>
                                <Table variant="simple" size="md">
                                    <Thead>
                                        <Tr>
                                            <Th>Attempt Number</Th>
                                            <Th>Date</Th>
                                            <Th>Overall Score</Th>
                                            <Th>Report</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {attempts.map((attempt) => (
                                            <Tr key={attempt._id}>
                                                <Td>
                                                    <Text fontWeight="bold" color="blue.600">
                                                        {attempt.attemptNumber}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <Text>
                                                        {new Date(attempt.date).toLocaleDateString()}
                                                    </Text>
                                                </Td>
                                                <Td>
                                                    <HStack align="center">
                                                        <CircularProgress value={attempt.overallScore} max={attempt.overallMaxScore} mt={2} >
                                                            <CircularProgressLabel>{
                                                                Math.floor((attempt.overallScore / attempt.overallMaxScore) * 100)
                                                            }%</CircularProgressLabel>
                                                        </CircularProgress>
                                                        <Text>
                                                            {attempt.overallScore}/{attempt.overallMaxScore}
                                                        </Text>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <Button w="full" onClick={() => {
                                                        handleViewReport(attempt._id)
                                                    }}>View Report</Button>

                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Skeleton>

                        </Box></>}

                </>
            ) : (
                <Flex w="100%" h="100vh" alignItems="center" justifyContent="center" bg={cardBg} p={5}>
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
        </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="full"

            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Assessment Report</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody bg={bodyBg}>
                        <Report attempt={modalProps} loading={loading} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}

UserStatusUI.propTypes = {
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


export default UserStatusUI;
