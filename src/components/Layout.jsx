// Desc: It seperates the Navbar and the main content of the application except for authentication pages


import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import PropTypes from 'prop-types';

const Layout = ({children}) =>{
    return (
        <>
            <Navbar/>
            {/* Children here is Components from browserRouter */}
            {/* Eg: Path: "/" -> Component rendered <Home/>(Home.jsx) */}
            <Box as="main">{children}</Box>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout;