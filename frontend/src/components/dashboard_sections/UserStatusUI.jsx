import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, VStack, HStack, Tag, Text, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Skeleton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAssessment from '../../hooks/useAssessment';
import useCustomTheme from '../../hooks/useCustomTheme';

const PendingAssessment = ({ status, latestAssessment, cardBg, history }) => {

    if (!status) {
        return (
            <Box bgColor={cardBg} p={5} shadow="md" rounded="md">
                <Skeleton height="20px" mb={4} />
                <Skeleton height="20px" mb={4} />
                <Skeleton height="20px" mb={4} />
            </Box>
        );
    }

    const handleRedirect = () => {
        history(`/assessment/attempt/${latestAssessment.latestIncompleteAttempt._id}`);
    }

    if (latestAssessment && !latestAssessment.isComplete) {
        return (
            <Box bgColor={cardBg} p={5} shadow="md" rounded="md">
                <Flex justify="space-between">
                    <Heading color='red.600' mb={5}>
                        Pending Assessment Status
                    </Heading>
                    <HStack gap={5}>
                        <Text>Attempt Number: {status.attemptNumber}</Text>
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
        );
    }
    return null;
}

const AssessmentHistory = ({ latestCompleteAttempt, cardBg }) => {
    if (!latestCompleteAttempt) {
        return null;
    }

    return (
        <Box bgColor={cardBg} p={5} shadow="md" rounded="md" mt={5}>
            <Heading color='green.600' mb={5}>
                Latest Completed Assessment
            </Heading>
            <Text>Attempt Number: {latestCompleteAttempt.attemptNumber}</Text>
            <Text>Date: {new Date(latestCompleteAttempt.date).toLocaleDateString()}</Text>
            <Text>Overall Score: {latestCompleteAttempt.overallScore}</Text>
            <VStack mt={5} gap={5} p={5}>
                <Box>
                    <Heading size="md">Completed Categories</Heading>
                    {latestCompleteAttempt.assessments.length > 0 ? (
                        latestCompleteAttempt.assessments.map((assessment, index) => (
                            <Tag key={index} colorScheme="green" m={1}>
                                {assessment.categoryName}: {assessment.totalScore}
                            </Tag>
                        ))
                    ) : (
                        <Text>No categories completed yet.</Text>
                    )}
                </Box>
            </VStack>
        </Box>
    );
};

const UserStatusUI = () => {

    const { fetchAssessmentStatus, fetchLatestAssessment,startNewRound } = useAssessment();
    const [status, setStatus] = useState(null);
    const [latestAssessment, setLatestAssessment] = useState(null);
    const { cardBg } = useCustomTheme();
    const history = useNavigate();

    useEffect(() => {
        const fetchStatus = async () => {
            const status = await fetchAssessmentStatus();
            console.log('=== status UserStatusUI.jsx [17] ===', status);
            setStatus(status);
        }
        fetchStatus();

        const fetchLatest = async () => {
            const latest = await fetchLatestAssessment();
            console.log('=== latest UserStatusUI.jsx [24] ===', latest);
            setLatestAssessment(latest);
        }
        fetchLatest();

    }, []);

    const handleStartRound = async() =>{
        await startNewRound();
    }


    return (
        <>
            {status?.attemptNumber > 0 && (
                <>
                    <PendingAssessment status={status} latestAssessment={latestAssessment} cardBg={cardBg} history={history} />
                    <AssessmentHistory latestCompleteAttempt={latestAssessment?.latestCompleteAttempt} cardBg={cardBg} />
                </>
            )}
            <Flex w="100%" alignItems="center">
                <Button mx="auto" colorScheme="blue" size="lg" onClick={handleStartRound}>
                    Start New Round
                </Button>
            </Flex>
        </>
    );

}

AssessmentHistory.propTypes = {
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

PendingAssessment.propTypes = {
    status: PropTypes.shape({
        attemptNumber: PropTypes.number,
        completedCategories: PropTypes.arrayOf(
            PropTypes.shape({
                categoryName: PropTypes.string
            })
        ),
        isComplete: PropTypes.bool
    }),
    latestAssessment: PropTypes.shape({
        latestIncompleteAttempt: PropTypes.shape({
            _id: PropTypes.string
        }),
        isComplete: PropTypes.bool
    }),
    cardBg: PropTypes.string,
    history: PropTypes.func.isRequired
};

export default UserStatusUI;
