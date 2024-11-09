import { Grid, Button, Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useCustomTheme from "../hooks/useCustomTheme";
import PropTypes from 'prop-types';

const AdminLayout = ({ children }) => {
    const { bodyBg } = useCustomTheme();
    const { navBg } = useCustomTheme();
    return (
        <Grid
            templateRows="10% 90%"
            w="100svw"
            h="100svh"
            bgColor={bodyBg}
            overflowY="auto"
        >
            <HStack overflowX="auto" w="100%" flex={1} px={5} alignItems="center" gap={5} bgColor={navBg} >
                <Button as={Link} to="/admin/add-category" variant="ghost">Create Categories</Button>
                <Button as={Link} to="/admin" variant="ghost">Create Questions</Button>
                <Button as={Link} to="/admin/questions" variant="ghost">View Questions</Button>
            </HStack>
            <Box h="100%" overflowY="auto">
                {children}
            </Box>
        </Grid>
    )
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
