import { Box, Button, CircularProgress, CircularProgressLabel, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, Heading, Skeleton } from "@chakra-ui/react";
import useCustomTheme from "../../../hooks/useCustomTheme";
import PropTypes from 'prop-types';
import useAssessment from "../../../apis/assessment";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AttemptHistory = ({
    loading,
    attempts,
}) => {
    const { cardBg } = useCustomTheme();
    const navigate = useNavigate();
    const { fetchAttemptById } = useAssessment();

    const handleViewReport = async (id) => {
        const res = await fetchAttemptById(id);
        res && navigate(`/dashboard/report/${id}`, { state: { attempt: res.attempt } });
    }

    return (
        <Box p={{
            base: 5,
            md: 10
        }}>
            <Heading textAlign={{ base: 'center', md: 'left' }} mb={5} color="blue.600">Attempt History</Heading>
            <Box w="100%" h="500px" rounded="md" mt={5} p={5} overflowY="auto" bg={cardBg} shadow="md">
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
                                        <Button w="full" onClick={() => handleViewReport(attempt._id)}>View Report</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Skeleton>
            </Box>
        </Box>
    )
}

AttemptHistory.propTypes = {
    loading: PropTypes.bool,
    attempts: PropTypes.array
}

export default AttemptHistory;
