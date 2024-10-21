import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";


const useAuth = () => {

    const [sendOTPLoading, setSendOTPLoading] = useState(false);
    const toast = useToast();


    const sendOTPAction = async (email) => {
        setSendOTPLoading(true);
        await axios.post("/api/user/send-otp", { email })
            .then(() => {
                toast({
                    title: "OTP Sent",
                    description: "OTP has been sent to your email.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setSendOTPLoading(false);
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                setSendOTPLoading(false);
                return null
            });
    };



    return {
        sendOTPAction,
        sendOTPLoading,
    };
};

export default useAuth;
