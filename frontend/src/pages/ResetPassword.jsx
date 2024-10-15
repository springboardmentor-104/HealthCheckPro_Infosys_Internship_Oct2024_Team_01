import { useState } from 'react';
import {
    Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader,
  Button, FormControl, FormLabel, Input,
    VStack, PopoverCloseButton, Link
} from '@chakra-ui/react';

import useResetPassword from '../hooks/useResetPassword';

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { error, isLoading, resetPassword } = useResetPassword();

    const handleSubmit = async () => {
        await resetPassword(email, password, confirmPassword)
            .then(() => {
                setEmail('');
                setPassword('');
                setConfirmPassword('');

            })
            .catch((error) => {
                console.log(error);

            });
    }

    return (
        <Popover  closeOnBlur={false}>
            <PopoverTrigger>
                <Button as={Link} variant="unstyled" width="fit-content" marginLeft="auto" h="0px" fontSize="sm" color="blue.600">Forgot Password?</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverCloseButton />
                <PopoverHeader>Reset Password</PopoverHeader>
                <VStack p={3}>
                    <FormControl id="email" isInvalid={!email && error}>
                        <FormLabel my={1}>Email</FormLabel>
                        <Input
                            bgColor="gray.50"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isInvalid={!password && error}>
                        <FormLabel my={1}>Password</FormLabel>
                        <Input
                            bgColor="gray.50"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="confirmPassword" isInvalid={!confirmPassword && error}>
                        <FormLabel my={1}>Confirm Password</FormLabel>
                        <Input
                            bgColor="gray.50"
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button colorScheme="blue" width="full" mt={4} onClick={handleSubmit} isLoading={isLoading}>
                        Save
                    </Button>
                </VStack>
                <PopoverArrow />
            </PopoverContent>
        </Popover>
    );
}

export default ResetPassword;
