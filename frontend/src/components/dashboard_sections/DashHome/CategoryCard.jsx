import  { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import  useCustomTheme  from '../../../hooks/useCustomTheme';


const CategoryCard = ({ category }) => {
    const { cardBg } = useCustomTheme();
    return (
        <Box boxShadow="lg" p={5} rounded="md" bg={cardBg} >
            <Heading size="md" color="blue.600">{category.categoryName}</Heading>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={[
                            { name: 'Score', value: category.totalScore },
                            { name: 'Remaining', value: category.maxScore - category.totalScore }
                        ]}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={0}
                        dataKey="value"
                   
                    >
                        <Cell key={`cell-0`} fill="#3182CE" />
                        <Cell key={`cell-1`} fill="#E2E8F0" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between" mt={5}>
                <Text color="blue.600">Total Score: {category.totalScore}</Text>
                <Text color="blue.600">Max Score: {category.maxScore}</Text>
            </Stack>
        </Box>
    );
}


CategoryCard.propTypes = {
    category: PropTypes.shape({
        categoryName: PropTypes.string,
        totalScore: PropTypes.number,
        maxScore: PropTypes.number
    })
};

export default memo(CategoryCard);