import { Box, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {memo} from 'react';

// Provide suggestions based on health score
const Suggestions = ({assessments}) => {
    return (
        <VStack align="start" spacing={3}>
            {assessments.map((category, index) => {
                const percentage = Math.floor((category.totalScore / category.maxScore) * 100);
                let categoryFeedback;

                if (percentage >= 90) {
                    categoryFeedback = `Excellent job in ${category.categoryName}! Keep up the great work.`;
                } else if (percentage >= 75) {
                    categoryFeedback = `Good job in ${category.categoryName}. You're doing well, but there's room for improvement.`;
                } else if (percentage >= 60) {
                    categoryFeedback = `Fair performance in ${category.categoryName}. Consider focusing more on this area.`;
                } else if (percentage >= 40) {
                    categoryFeedback = `Needs improvement in ${category.categoryName}. Try to work harder in this category.`;
                } else {
                    categoryFeedback = `Poor performance in ${category.categoryName}. It's important to pay more attention to this area.`;
                }

                return (
                    <Box key={index} rounded="md" w="100%">
                        <Text>{categoryFeedback}</Text>
                    </Box>
                );
            })}
        </VStack>
    );
};

Suggestions.propTypes = {
    assessments: PropTypes.array
};

export default memo(Suggestions);
