import { FormControl, FormLabel, HStack, PinInput, PinInputField } from '@chakra-ui/react';
import useCustomTheme from '../hooks/useCustomTheme';

import PropTypes from 'prop-types';

const VerifyOTP = ({ setOTP }) => {
    const { inputBg } = useCustomTheme();

    return (
        <FormControl>
            <FormLabel textAlign="center">Enter OTP sent to your email</FormLabel>
            <HStack   p={2} rounded="md" justify="center">
                <PinInput onChange={(value) => setOTP(value)}>
                    <PinInputField bgColor={inputBg}  />
                    <PinInputField bgColor={inputBg}  />
                    <PinInputField bgColor={inputBg}  />
                    <PinInputField bgColor={inputBg}  />
                    <PinInputField bgColor={inputBg}  />
                    <PinInputField bgColor={inputBg}  />
                </PinInput>
            </HStack>
        </FormControl>
    );
};

VerifyOTP.propTypes = {
    setOTP: PropTypes.func.isRequired,
};

export default VerifyOTP;