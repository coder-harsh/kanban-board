import { useState } from "react";
import axios from "axios";
import { Box, Button, Center, InputRightElement, Heading, Input, InputGroup, InputLeftElement, Stack, Text, useToast } from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHandshake } from "react-icons/fa";
const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPs = () => {
        setShowPassword(!showPassword);
    }
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
            const response = await axios.post(`${backendUrl}/api/auth/register`, formData, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.data.success) {
                console.log(response)
                toast({
                    title: response.data.message,
                    position: 'top',
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setFormData(
                    {
                        name: "",
                        email: "",
                        password: "",
                    }
                )
            }

            // navigate("/login");
        } catch (error) {
            toast({
                title: "Sign-up failed",
                description: error.response?.data?.message || "Something went wrong.",
                status: "error",
                position: 'top',
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
                    Create an account
                </Heading>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <FaUser color="gray.400" />
                            </InputLeftElement>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                focusBorderColor="purple.500"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>

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
                                type={showPassword ? 'password' : "text"}
                                name="password"
                                placeholder="Create a password"
                                focusBorderColor="purple.500"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <InputRightElement>
                                {
                                    showPassword ? <FaEye size={22} className="cursor-pointer" onClick={handleShowPs} /> : <FaEyeSlash size={22} className="cursor-pointer" onClick={handleShowPs} />
                                }

                            </InputRightElement>
                        </InputGroup>

                        <Button type="submit" colorScheme="purple" w="full" isLoading={loading}>
                            Register
                        </Button>
                    </Stack>
                </form>

                <Text mt={4} textAlign="center" fontSize="sm" color="gray.600">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-purple-500 font-medium">
                        Sign in
                    </Link>
                </Text>
            </Box>
        </Center>
    );
};

export default SignUp;
