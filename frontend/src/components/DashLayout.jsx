import { VStack,Grid,Box } from "@chakra-ui/react";
import DashNavbar from "./DashNavbar";

const DashLayout = ({ children }) => {
    return (

        <VStack >
            
        <DashNavbar/>    
      
            <Box>
                {children}
            </Box>
            </VStack>
    )
}

export default DashLayout;