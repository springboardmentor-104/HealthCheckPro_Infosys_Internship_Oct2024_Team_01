import { useEffect } from 'react';
import {
    Button,
    Flex,
    Box
} from '@chakra-ui/react';

// import Chart from './Chart';
// import Assessment from './Assessment';
// import useCustomTheme from '../../hooks/useCustomTheme';

import UserStatusUI from './UserStatusUI';
import UserProfileUI from './UserProfileUI';


const DashHome = () => {




    return (
        <Box mt={20}>
            <UserProfileUI />
            <UserStatusUI />
        </Box>
    );
};

export default DashHome;
