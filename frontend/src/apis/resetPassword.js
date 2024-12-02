import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@chakra-ui/react';

const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const toast = useToast();

    const resetPassword = async ( email, password, confirmPassword) => {
        setLoading(true);
        setError(null);

        const data = { email, password, confirmPassword }

            await axios.post('/api/user/reset-password', data)
                .then(() => {
                    setError(false);
                    toast({
                        title: 'Password Reset',
                        description: 'Password reset successfully',
                        status: 'success',
                        duration: 5000,
                        isClosable: true
                    });

                    navigate('/login');
                })
                .catch((err) => {
                    toast({
                        title: 'Password Reset Failed',
                        description: err.response.data.error,
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                    });
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });

    };

    return { loading, error, resetPassword };
};

export default useResetPassword;