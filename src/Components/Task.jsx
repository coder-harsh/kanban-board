import { MdDragIndicator, MdModeEdit } from "react-icons/md";
import BtnAlert from "../Components/Modal/BtnAlert";
import { useContext } from "react";
import { TasksContext } from "../Context/TasksContext";
import { Draggable } from "@hello-pangea/dnd";
import { Tag } from "@chakra-ui/react";

const Task = ({ task, index }) => {
    const { deleteTask } = useContext(TasksContext);

    // Get today's date without time
    const today = new Date().setHours(0, 0, 0, 0);
    const dueDate = task.dueDate ? new Date(task.dueDate).setHours(0, 0, 0, 0) : null;

    // Apply red border if overdue
    const borderStyle = dueDate && dueDate < today ? "border-red-500 border-2 px-2" : "border-gray-300 border";

    // Apply red text color if due date is expired
    const dueDateTextColor = dueDate && dueDate < today ? "text-red-500" : "text-gray-500";

    // Determine priority tag color
    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case "high":
                return "red";
            case "medium":
                return "yellow";
            case "low":
                return "blue";
            default:
                return "gray";
        }
    };

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex justify-center capitalize my-2 transition-opacity relative ${snapshot.isDragging ? "opacity-50" : ""}`}
                >
                    <div className={`relative flex bg-white py-4 px-2 justify-between items-center ${borderStyle} w-[30rem] rounded-md shadow-md hover:shadow-lg transition-shadow`}>
                        <div className="mr-2 cursor-grab">
                            <MdDragIndicator size={28} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold">{task.title}</h3>
                            <p title={task.description} className="text-gray-500 text-left text-wrap">
                                {task.description.length > 30
                                    ? task.description.slice(0, 30) + "..."
                                    : task.description}
                            </p>
                            {/* Priority Tag with dynamic color */}
                            <Tag colorScheme={getPriorityColor(task.priority)} className="absolute top-[0.5rem] right-[0.6rem]">
                                {task.priority}
                            </Tag>
                            <p className="text-gray-500 text-sm">{task.userName}</p>
                            <p className={`text-sm ${dueDateTextColor}`}>
                                Due: {task.dueDate ? new Date(task.dueDate).toDateString() : "No due date"}
                            </p>
                        </div>
                        <div className="flex justify-center items-center">
                            <MdModeEdit size={24} className="mx-1 cursor-pointer" />
                            <BtnAlert
                                btntxt={"Delete Task"}
                                headertxt={"Delete the task"}
                                bodytxt={"Do you really want to delete the task?"}
                                fun={() => deleteTask(task._id, task.title)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
