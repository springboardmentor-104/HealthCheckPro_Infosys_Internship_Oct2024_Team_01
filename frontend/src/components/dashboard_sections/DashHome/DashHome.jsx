import {
    Box
} from '@chakra-ui/react';


import DashProfile from './DashProfile';
import HealthDetails from './HealthDetails';


const DashHome = () => {


    return (
        <Box mt={20} minH="100svh">
            <DashProfile />
            <HealthDetails />
        </Box>
    );
};

export default DashHome;
