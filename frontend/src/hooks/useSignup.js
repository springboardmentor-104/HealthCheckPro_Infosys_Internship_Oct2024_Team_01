// Desc: Custom hook to handle user signup
// Usage: Import this hook in the component where you want to use signup functionality
// And call the signup function with username, email, password, confirmPassword and avatarUrl
// Don't change this file unless you know what you are doing


import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const toast = useToast();

    const signup = async (username, email, password, confirmPassword, avatarUrl) => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.post("api/user/signup", { username, email, password, confirmPassword, avatarUrl });
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(true);
            toast({
                title: "Signup failed",
                description: error.response.data.message,
                status: "error",
            });
        }
    };

    return { loading, error, signup };
}

export default useSignup;