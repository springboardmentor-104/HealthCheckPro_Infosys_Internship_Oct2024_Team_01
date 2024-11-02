import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";


const useOTP = () => {

    const [loading, setLoading] = useState(false);


    const toast = useToast();

    const sendOTPAction = async (email) => {
        setLoading(true);
        await axios.post("/api/user/send-otp", { email })
            .then(() => {
                toast({
                    title: "OTP Sent",
                    description: "OTP has been sent to your email.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setLoading(false);

            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                setLoading(false);

            });
    };

    const verifyOTPAction = async (email, otp) => {
        setLoading(true);
        try {
            const res = await axios.post("/api/user/verify-email", { email, otp });
            if (res) {
                toast({
                    title: "OTP Verified",
                    description: "Email verified successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setLoading(false);
            }
            return res;
        } catch (err) {
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }

    }


    return {
        sendOTPAction,
        verifyOTPAction,
        loading,
    };
};

export default useOTP;
