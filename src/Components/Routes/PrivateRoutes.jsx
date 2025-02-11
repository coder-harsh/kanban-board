import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Spinner, Center } from "@chakra-ui/react";

const PrivateRoutes = () => {
    const { isAuthenticated, verifyLogin } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            await verifyLogin();
            setLoading(false);
        };
        checkAuth();
    }, [verifyLogin]);

    if (loading) {
        return (
            <Center minH="100vh">
                <Spinner size="xl" color="purple.500" />
            </Center>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;