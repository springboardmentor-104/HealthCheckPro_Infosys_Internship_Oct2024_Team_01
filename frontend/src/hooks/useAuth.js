import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [resetState, setResetState] = useState({
        loading: false,
        error: false,
    });
    const [sendOTPLoading, setSendOTPLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

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
                navigate("/reset-pass/" + email);
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

    const resetPassword = async (email, otp, password, confirmPassword) => {
        setResetState({ loading: true, error: false });

        await axios.post("/api/user/verify-otp", { email, otp })
            .then((res) => {
                if (res) {
                    toast({
                        title: "OTP Verified",
                        description: "OTP has been verified successfully.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });

                    axios.post("/api/user/reset-password", { email, password, confirmPassword })
                        .then((res) => {
                            if (res) {
                                toast({
                                    id: "t1",
                                    title: "Success",
                                    status: "success",
                                    description: "Password successfully changed",
                                });
                                setResetState({ loading: false, error: false });
                                navigate("/login");
                            }

                            return res.data;
                        })
                        .catch((err) => {
                            setResetState({ loading: false, error: true });
                            if (axios.isAxiosError(err)) {
                                toast({
                                    id: "t1",
                                    title: "Error",
                                    status: "error",
                                    description: err.response?.data.message,
                                });
                            } else {
                                toast({
                                    id: "t1",
                                    title: "Error",
                                    status: "error",
                                    description: err.response?.data.message,
                                });
                            }
                            return;
                        });
                } else {
                    setResetState({ loading: false, error: true });
                    toast({
                        title: "Error",
                        description: "Something went wrong",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((error) => {
                setResetState({ loading: false, error: true });
                toast({
                    title: "Error",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return error.response.data;
            });
    };

    return {
        sendOTPAction,
        sendOTPLoading,
        resetPassword,
        resetState,
        setResetState,
    };
};

export default useAuth;
