import {
    Box
} from '@chakra-ui/react';


import UserStatusUI from './UserStatusUI';
import UserProfileUI from './UserProfileUI';


const DashHome = () => {


    return (
        <Box mt={20} minH="100svh">
            <UserProfileUI />
            <UserStatusUI />
        </Box>
    );
};

export default DashHome;
