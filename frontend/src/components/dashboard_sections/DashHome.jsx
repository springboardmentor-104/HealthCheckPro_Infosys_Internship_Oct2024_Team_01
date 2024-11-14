import { useEffect } from 'react';
import {
    Button,
    Flex,
    Box
} from '@chakra-ui/react';

// import Chart from './Chart';
// import Assessment from './Assessment';
// import useCustomTheme from '../../hooks/useCustomTheme';
import useAssessment from '../../hooks/useAssessment';
import UserStatusUI from './UserStatusUI';



const DashHome = () => {

    const { startNewRound } = useAssessment();

   


    return (
        <Box mt={20}>
            {/* <Assessment /> */}
            <UserStatusUI />


        </Box>
    );
};

export default DashHome;
