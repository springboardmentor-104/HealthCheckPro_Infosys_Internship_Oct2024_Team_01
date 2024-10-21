import { FormControl, FormLabel, HStack, PinInput, PinInputField } from '@chakra-ui/react';
import useCustomTheme from '../hooks/useCustomTheme';

import PropTypes from 'prop-types';

const VerifyOTP = ({ setOTP }) => {
    const { inputBg } = useCustomTheme();

    return (
        <FormControl>
            <FormLabel textAlign="center">Enter OTP sent to your email</FormLabel>
            <HStack  bgColor={inputBg} p={2} rounded="md" justify="center">
                <PinInput onChange={(value) => setOTP(value)}>
                    <PinInputField boxShadow="md" />
                    <PinInputField boxShadow="md" />
                    <PinInputField boxShadow="md" />
                    <PinInputField boxShadow="md" />
                    <PinInputField boxShadow="md" />
                    <PinInputField boxShadow="md" />
                </PinInput>
            </HStack>
        </FormControl>
    );
};

VerifyOTP.propTypes = {
    setOTP: PropTypes.func.isRequired,
};

export default VerifyOTP;