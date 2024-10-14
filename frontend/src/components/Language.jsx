
import { Select } from '@chakra-ui/react';

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