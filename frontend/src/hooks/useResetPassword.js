// Desc: Custom hook to reset password
// Usage: Import this hook in the component where you want to use reset password functionality
// And call the resetPassword function with email, password and confirmPassword
// Don't change this file unless you know what you are doing

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const useResetPassword = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const resetPassword = async (
    email,
    password,
    confirmPassword
  ) => {
    setError(false);
    setIsLoading(true);
    if (toast.isActive("t1")) {
      toast.closeAll();
    }

    const data = {
      email,
      password,
      confirmPassword,
    };
    await axios
      .post("api/user/reset-password", data)
      .then(() => {
        toast({
          id: "t1",
          title: "Success",
          status: "success",
          description: "Password successfully changed",
        });
        setError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          toast({
            id: "t1",
            title: "Error",
            status: "error",
            description: err.response?.data.message,
          });
          setError(true);
          setIsLoading(false);
        } else {
          toast({
            id: "t1",
            title: "Error",
            status: "error",
            description: err.response?.data.message,
          });
          setError(true);
          setIsLoading(false);
        }
      });

    };
    return { error, isLoading, resetPassword };
};
export default useResetPassword;