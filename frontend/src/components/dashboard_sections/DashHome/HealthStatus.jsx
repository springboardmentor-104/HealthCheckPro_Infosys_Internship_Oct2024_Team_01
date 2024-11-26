import { VStack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';


const HealthStatus = ({score, tot}) => {
    const percentage = Math.floor((score / tot) * 100);
    let bgColor, emoji, statusText;

    if (percentage >= 90) {
        bgColor = 'rgba(72, 187, 120, 0.2)'; // green.100
        emoji = '🌟';
        statusText = 'Outstanding';
    } else if (percentage >= 75) {
        bgColor = 'rgba(72, 187, 120, 0.4)'; // green.200
        emoji = '😃';
        statusText = 'Excellent';
    } else if (percentage >= 60) {
        bgColor = 'rgba(236, 201, 75, 0.2)'; // yellow.100
        emoji = '🙂';
        statusText = 'Good';
    } else if (percentage >= 40) {
        bgColor = 'rgba(237, 137, 54, 0.2)'; // orange.100
        emoji = '😐';
        statusText = 'Fair';
    } else {
        bgColor = 'rgba(245, 101, 101, 0.2)'; // red.100
        emoji = '😟';
        statusText = 'Needs Improvement';
    }

    return (
        <VStack
            bg={bgColor}
            p={5}
            rounded="md"
            justifyContent="center"
            alignItems="center"
            w="100%"
            h="100%"
            gap={3}
            mb={5}
        >
            <Text fontSize="2xl" fontWeight="bold">
                {emoji} {statusText}
            </Text>
            <Text fontSize="lg">
                Health Score: {percentage}%
            </Text>
        </VStack>
    );
};

HealthStatus.propTypes = {
    score: PropTypes.number,
    tot: PropTypes.number
};

export default HealthStatus;