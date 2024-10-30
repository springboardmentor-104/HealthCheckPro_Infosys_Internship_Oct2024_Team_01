import { VStack, Box } from "@chakra-ui/react";
import DashNavbar from "./DashNavbar";
import useCustomTheme from "../hooks/useCustomTheme";
import PropTypes from 'prop-types';

const DashLayout = ({ children }) => {
    const { bodyBg } = useCustomTheme();
    return (
        <VStack w="100svw"  bgColor={bodyBg}>
            <DashNavbar />

            <Box width={
                {
                    base: "100%",
                    md: "80%"
                }
            }>{children}</Box>

        </VStack>
    )
}

DashLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashLayout;