import { Grid,Box } from "@chakra-ui/react";
import DashNavbar from "./DashNavbar";

const DashLayout = ({ children }) => {
    return (
        <Grid templateColumns="
            1fr 5fr
        " w="100svw" h="100svh">
            <DashNavbar/>
            <Box>
                {children}
            </Box>
        </Grid>
    )
}

export default DashLayout;