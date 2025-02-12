import { DragDropContext } from "@hello-pangea/dnd";
import { Modal } from "../Modal/Modal";
import AddTask from "./AddTask";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../Context/TasksContext.jsx";
import { Spinner, Button } from "@material-tailwind/react";
import { MdOutlineSync } from "react-icons/md";
import { useToast, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import Column from "../Column.jsx";
import { IoSearch } from "react-icons/io5";
import io from "socket.io-client";

const Dashboard = () => {
    const { tasks, fetchTasks, fetchAllTasks, allTasks, updateTaskStatus, deleteTask } = useContext(TasksContext);
    const toast = useToast();
    const [taskData, setTaskData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("myTasks");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const socket = io(backendUrl, { transports: ["websocket", "polling"] });

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        setTaskData(filter === "myTasks" ? tasks : allTasks);
    }, [tasks, allTasks, filter]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to WebSocket Server:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket Server");
        });

        socket.on("tasksUpdated", () => {
            fetchTasks();
            if (filter === "allTasks") fetchAllTasks();
        });

        // Listen for task deletion
        socket.on("taskDeleted", () => {
            fetchTasks();
            if (filter === "allTasks") fetchAllTasks();
        });

        return () => {
            socket.disconnect();
        };
    }, [filter]);

    const handleSync = async () => {
        fetchTasks();
        if (filter === "allTasks") fetchAllTasks();
        toast({
            position: "top",
            status: "success",
            variant: "solid",
            isClosable: true,
            duration: 3000,
            title: "Tasks fetched successfully.",
        });
    };

    if (!taskData) {
        return <Spinner size="xl" className="mx-auto my-10" />;
    }

    const filteredTasks = taskData.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const todoTasks = filteredTasks.filter((task) => task.status === "To Do");
    const inProgressTasks = filteredTasks.filter((task) => task.status === "In Progress");
    const doneTasks = filteredTasks.filter((task) => task.status === "Done");

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const updatedTasks = [...taskData];
        const movedTask = updatedTasks.find((task) => task._id === result.draggableId);

        if (movedTask) {
            movedTask.status = destination.droppableId;
            setTaskData(updatedTasks);
            updateTaskStatus(movedTask._id, movedTask.status);
            socket.emit("fetchTasks");
        }
    };

    // Function to handle task deletion
    const handleDelete = async (taskId) => {
        await deleteTask(taskId);
        socket.emit("deleteTask", taskId); // Emit deleteTask event to notify other clients
        toast({
            title: "Task Deleted",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <title>Dashboard - Kanban board</title>
            <meta name="author" content="Josh" />
            <meta name="keywords" content="Kanban Board" />

            <div className="bg-white w-[80vw] md:w-[70rem] border-[1px] py-4 px-6 rounded-md">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">Task Management</h3>
                    <div className="w-[16rem] md:w-[30rem]">
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="Search by Task title and description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <InputRightAddon className="cursor-pointer">
                                <IoSearch />
                            </InputRightAddon>
                        </InputGroup>
                    </div>
                    <div className="flex justify-center items-center">
                        <MdOutlineSync size={28} className="text-gray-900 mr-6 cursor-pointer" onClick={handleSync} />
                        <Modal header={"Please add new task"} btn={"Add Task"} Component={AddTask} />
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <Button
                        className={`px-4 py-2 mx-2 shadow-none hover:shadow-none rounded ${filter === "myTasks" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                        onClick={() => setFilter("myTasks")}
                    >
                        My Tasks
                    </Button>
                    <Button
                        className={`px-4 py-2 mx-2 shadow-none hover:shadow-none rounded ${filter === "allTasks" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                        onClick={() => {
                            setFilter("allTasks");
                            fetchAllTasks();
                        }}
                    >
                        All Tasks
                    </Button>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="mt-4 flex justify-center flex-col md:flex-row">
                    <Column header={"To Do"} color="bg-blue-500" tasks={todoTasks} status="To Do" onDelete={handleDelete} />
                    <Column header={"In Progress"} color="bg-yellow-700" tasks={inProgressTasks} status="In Progress" onDelete={handleDelete} />
                    <Column header={"Done"} color="bg-green-500" tasks={doneTasks} status="Done" onDelete={handleDelete} />
                </div>
            </DragDropContext>
        </div>
    );
};

export default Dashboard;
