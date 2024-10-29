// Desc: Custom hook to handle user signup
// Usage: Import this hook in the component where you want to use signup functionality
// And call the signup function with username, email, password, confirmPassword and avatarUrl
// Don't change this file unless you know what you are doing


import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const signup = async ( email, username, age, gender, password, confirmPassword) => {
        setLoading(true);
        setError(false);

        const data = {
             email, username, age, gender, password, confirmPassword
        }

        await axios.post("/api/user/signup", data)
            .then((res) => {
                if (res.status === 201) {
                    toast({
                        title: "Account Created",
                        description: "Redirecting to login page",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    setLoading(false);
                    setError(false);
                    navigate("/login");
                }
            })
            .catch((error) => {
                toast({
                    title: "Registration Failed",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                setError(true);
                setLoading(false);
            });
    };

    return { loading, error, signup };
}

export default useSignup;