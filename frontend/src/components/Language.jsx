
import { Select } from '@chakra-ui/react';

// Language component to select the language of the application
// Add Logic for this application using any library you are good at

const Language = () => {
    return (
        <Select defaultValue={"en"} maxWidth="100px">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            {/* Add more languages as needed */}
        </Select>
    );
}

export default Language;