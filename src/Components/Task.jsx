import { MdDragIndicator, MdModeEdit } from "react-icons/md";
import BtnAlert from "../Components/Modal/BtnAlert";
import { useContext } from "react";
import { TasksContext } from "../Context/TasksContext";
import { Draggable } from "@hello-pangea/dnd";

const Task = ({ task, index }) => {
    const { deleteTask } = useContext(TasksContext);

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex justify-center my-2 transition-opacity ${snapshot.isDragging ? "opacity-50" : ""
                        }`}
                >
                    <div className="flex bg-white py-4 px-2 justify-between items-center border-[1px] w-[30rem] rounded-md shadow-md">
                        <div className="mr-2 cursor-grab">
                            <MdDragIndicator size={28} className="text-gray-500" />
                        </div>
                        <div>
                            <h3 className="font-bold">{task.title}</h3>
                            <p title={task.description} className="text-gray-500 text-wrap">
                                {task.description.length > 30
                                    ? task.description.slice(0, 30) + "..."
                                    : task.description}
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
