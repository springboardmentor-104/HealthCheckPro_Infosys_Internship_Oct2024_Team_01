import { Grid, GridItem, Box } from "@chakra-ui/react";
import DashNavbar from "./DashNavbar";
import useCustomTheme from "../hooks/useCustomTheme";
import PropTypes from 'prop-types';

const DashLayout = ({ children }) => {
    const { bodyBg } = useCustomTheme();
    return (
        <Grid
            templateRows="auto 1fr"
            templateColumns="1fr"
            w="100%"
            bgColor={bodyBg}
            h="100vh"
        >
            <GridItem>
                <DashNavbar />
            </GridItem>
            <GridItem width="100%"
                    mx="auto"
                    h="100%"
                    overflowY="auto"
                    >

                    {children}

            </GridItem>
        </Grid>
    );
}

DashLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashLayout;