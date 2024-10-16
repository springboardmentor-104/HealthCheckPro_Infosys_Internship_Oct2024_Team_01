// Desc: Custom hook to handle login requests
// Usage: Import this hook in the component where you want to use login functionality
// And call the login function with email and password
// Don't change this file unless you know what you are doing

import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const toast = useToast();

    const login = async (email, password) => {
        if (toast.isActive("toast")) toast.closeAll();
        setLoading(true);
        setError(false);
        try {
            const response = await axios.post('api/user/login', { email, password });
            setLoading(false);
            toast({
                id: "toast",
                title: "Login successful",
                status: "success",
            });
            return response.data;
        } catch (error) {
            console.log('=== error useLogin.js [21] ===', error);
            setLoading(false);
            setError(true);
            toast({
                id: "toast",
                title: "Login failed",
                description: error.response.data.message,
                status: "error",
            });
        }
    }

    return { loading, error, login };
}

export default useLogin;