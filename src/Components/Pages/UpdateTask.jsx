import { useState, useEffect, useContext } from "react";
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
    useToast,
    Spinner
} from "@chakra-ui/react";
import { MdFormatListNumbered, MdTask } from "react-icons/md";
import { TasksContext } from "../../Context/TasksContext";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios

const UpdateTask = () => {
    const { fetchOneTask, singleTask, fetchTasks } = useContext(TasksContext);
    const { taskId } = useParams();
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "To Do",
        position: 1,
        dueDate: "",
        priority: "Medium"
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const toast = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (taskId) {
            setFetching(true);
            fetchOneTask(taskId).then(() => setFetching(false));
        }
    }, [taskId]);

    useEffect(() => {
        if (singleTask && Object.keys(singleTask).length > 0) {
            setTask({
                title: singleTask.title || "",
                description: singleTask.description || "",
                status: singleTask.status || "To Do",
                position: singleTask.position || 1,
                dueDate: singleTask.dueDate ? new Date(singleTask.dueDate).toISOString().split("T")[0] : "",
                priority: singleTask.priority || "Medium"
            });
        }
    }, [singleTask]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(
                `${backendUrl}/api/tasks/${taskId}`,
                task,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            if (response.data.success) {
                toast.closeAll(); // Close existing toasts to prevent duplicates
                toast({
                    title: "Task Updated",
                    description: "Your task has been successfully updated.",
                    status: "success",
                    position: "top",
                    duration: 3000,
                    isClosable: true,
                });

                await fetchTasks(); // Ensure fetch completes before closing modal
            }
        } catch (error) {
            toast.closeAll();
            toast({
                title: "Error",
                description: error.response?.data?.message,
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
            <Heading size="md">Update Task</Heading>

            {fetching ? (
                <Spinner size="lg" />
            ) : (
                <>
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
                        <FormLabel>Priority</FormLabel>
                        <Select name="priority" value={task.priority} onChange={handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Due Date</FormLabel>
                        <Input
                            type="date"
                            name="dueDate"
                            value={task.dueDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                        />
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
                        Update Task
                    </Button>
                </>
            )}
        </VStack>
    );
};

export default UpdateTask;
