import { useState } from "react";
import axios from "axios";
import { Box, Button, Center, InputRightElement, Heading, Input, InputGroup, InputLeftElement, Stack, Text, useToast } from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHandshake } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/auth/login`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.success) {
                toast({
                    title: response.data.message,
                    position: "top",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem('userName', response.data.name)
                setFormData({ email: "", password: "" });
                navigate("/dashboard"); // Redirect to dashboard after login
            }
        } catch (error) {
            toast({
                title: "Login failed",
                description: error.response?.data?.message || "Invalid credentials.",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Center minH="100vh" bg="gray.50">
            <Box bg="white" p={8} shadow="md" borderRadius="lg" maxW="md" w="full">
                <Center mb={6} className="flex flex-col">
                    <FaHandshake className="text-purple-500" size={44} />
                    <h3 className="text-2xl font-bold">Kanban Board</h3>
                </Center>

                <Heading as="h2" size="md" textAlign="center" mb={2}>
                    Sign in to your account
                </Heading>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <FaEnvelope color="gray.400" />
                            </InputLeftElement>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                focusBorderColor="purple.500"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <FaLock color="gray.400" />
                            </InputLeftElement>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                focusBorderColor="purple.500"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <InputRightElement>
                                {showPassword ? (
                                    <FaEye size={22} className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                                ) : (
                                    <FaEyeSlash size={22} className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                                )}
                            </InputRightElement>
                        </InputGroup>

                        <Button type="submit" colorScheme="purple" w="full" isLoading={loading}>
                            Login
                        </Button>
                    </Stack>
                </form>

                <Text mt={4} textAlign="center" fontSize="sm" color="gray.600">
                    Don't have an account? {" "}
                    <Link to={"/signup"} className="text-purple-500 font-medium">
                        Sign up
                    </Link>
                </Text>
            </Box>
        </Center>
    );
};

export default Login;