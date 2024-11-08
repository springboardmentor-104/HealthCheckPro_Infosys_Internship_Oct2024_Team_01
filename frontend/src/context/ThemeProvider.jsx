import { createContext } from 'react';
import { useColorMode,useColorModeValue } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";


export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    // Add your custom themes here (light and dark)
    const lightGradients = [
        "linear-gradient(to right, #fff9c4, #fff59d)",
        "linear-gradient(to right, #f5f5f5, #eeeeee)",
        "linear-gradient(to right, #ffe0b2, #ffcc80)",
        "linear-gradient(to right, #ffffff, #f0f0f0)"
    ];

    const darkGradients = [
        "linear-gradient(to right, #b08d57, #d4af37)", // Gold
        "linear-gradient(to right, #c0c0c0, #dcdcdc)", // Silver
        "linear-gradient(to right, #cd7f32, #b87333)"  // Bronze
    ];

    const customThemes = {
        bodyBg: useColorModeValue('#f0f4ff', '#1a202c'),
        authBg: useColorModeValue('#FFFFFF', 'gray.800'),
        inputBg: useColorModeValue('#ffffff', '#2d3748'),
        navBg: useColorModeValue('#ffffff', '#121212'),
        sponsersBg: useColorModeValue('gray.100', 'gray.500'),
        aboutBg: useColorModeValue('blue.50', 'gray.900'),
        featuresBg: useColorModeValue('gray.50', '#1a202c'),
        footerBg: useColorModeValue('#f0f4ff', '#1a202c'),
        cardBg: useColorModeValue('white', '#2d3748'),
        leaderboardGradients: useColorModeValue(lightGradients, darkGradients),
        landingBg : useColorModeValue("gray.50", "gray.800"),
        textColor : useColorModeValue("black", "white"),
        headingColor : useColorModeValue("blue.500", "blue.300"),
        subheadingColor : useColorModeValue("gray.600", "gray.400"),
    };

    const appLogo = useColorModeValue(logoLight, logoDark);


    return (
        <ThemeContext.Provider value={{ colorMode, toggleColorMode, ...customThemes,appLogo }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeProvider;
