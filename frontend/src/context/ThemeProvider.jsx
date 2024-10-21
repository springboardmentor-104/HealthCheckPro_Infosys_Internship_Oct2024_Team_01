import { createContext } from 'react';
import { useColorMode,useColorModeValue } from "@chakra-ui/react";
import PropTypes from 'prop-types';


export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    // Add your custom themes here (light and dark)
    const customThemes = {
        bodyBg: useColorModeValue('#f0f4ff', '#1a202c'),
        authBg: useColorModeValue('#FFFFFF', '#121212'),
        inputBg: useColorModeValue('#ffffff', '#2d3748'),
        navBg: useColorModeValue('#ffffff', '#1a202c'),
        sponsersBg: useColorModeValue('gray.100', 'gray.500'),
        aboutBg: useColorModeValue('blue.50', 'gray.900'),
        featuresBg: useColorModeValue('gray.50', '#1a202c'),
        footerBg: useColorModeValue('#f0f4ff', '#1a202c'),
        cardBg: useColorModeValue('white', '#2d3748'),
    };


    return (
        <ThemeContext.Provider value={{ colorMode, toggleColorMode, ...customThemes }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeProvider;
