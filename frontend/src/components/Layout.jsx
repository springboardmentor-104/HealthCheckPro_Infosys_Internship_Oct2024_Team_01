import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import PropTypes from 'prop-types';

const Layout = ({children}) =>{
    return (
        <>
            <Navbar/>
            <Box as="main">{children}</Box>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;