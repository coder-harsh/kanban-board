import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { SideBar } from "../Sidebar";
const PrivateRoutes = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setLoading(false)
        }
        else {
            setIsAuthenticated(false);
            setLoading(false)
            navigate("/login")
        }
    }, []);

    if (loading) {
        return (
            <Center minH="100vh">
                <Spinner size="xl" color="purple.500" />
            </Center>
        );
    }

    return isAuthenticated ? <div className="flex">
        <div>
            <SideBar />
        </div>
        <Outlet />
    </div>

        : <Navigate to="/login" replace />;
};

export default PrivateRoutes;