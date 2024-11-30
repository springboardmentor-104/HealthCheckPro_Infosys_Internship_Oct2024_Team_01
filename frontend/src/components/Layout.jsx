// Desc: It separates the Navbar and the main content of the application except for authentication pages

import { Box, Grid } from "@chakra-ui/react";
import Navbar from "./Navbar";
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <Grid templateRows="auto 1fr" h="100vh">
            <Navbar />
            {/* Children here is Components from browserRouter */}
            {/* Eg: Path: "/" -> Component rendered <Home/>(Home.jsx) */}
            <Box h="100%" overflowY="auto" as="main">{children}</Box>
        </Grid>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;
