import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Button,
    VStack,
    Heading,
    Icon,
    useToast
} from "@chakra-ui/react";
import { MdTitle, MdDescription, MdFormatListNumbered, MdTask } from "react-icons/md";

const AddTask = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "To Do",
        position: 1,
    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${backendUrl}/api/tasks/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"), // Secure the API
                },
                body: JSON.stringify(task),
            });

            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Task Created",
                    description: "Your task has been successfully created.",
                    status: "success",
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
                setTask({ title: "", description: "", status: "To Do", position: 1 }); // Reset form
            } else {
                throw new Error(data.message || "Failed to create task");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={4} p={6} boxShadow="none" borderRadius="lg" bg="white">
            <Heading size="md">Create New Task</Heading>

            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={task.title} onChange={handleChange} placeholder="Task Title" />
            </FormControl>

            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={task.description} onChange={handleChange} placeholder="Task Description" />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={task.status} onChange={handleChange}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </Select>
            </FormControl>

            <FormControl isRequired>
                <FormLabel><Icon as={MdFormatListNumbered} mr={2} />Position</FormLabel>
                <Input type="number" name="position" value={task.position} onChange={handleChange} />
            </FormControl>

            <Button
                leftIcon={<MdTask />}
                colorScheme="blue"
                type="submit"
                isLoading={loading}
            >
                Create Task
            </Button>
        </VStack>
    );
};

export default AddTask;
