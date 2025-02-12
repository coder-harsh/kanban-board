import Task from "./Task";
import { Droppable } from "@hello-pangea/dnd";

const Column = ({ header, color, tasks, status }) => {
    return (
        <div className="mx-4">
            <div className="border-[1px] h-[72vh] md:h-[36rem] overflow-y-scroll bg-gray-50 rounded-md inline-block w-[22em]">
                <div className={`${color} px-4 py-2 flex rounded-md items-center justify-between`}>
                    <h3 className="font-bold text-lg text-white">{header}</h3>
                    <b className="bg-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
                        {tasks.length}
                    </b>
                </div>
                <div className="px-2 mt-1 py-2">
                    <Droppable droppableId={status}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`min-h-[100px] ${snapshot.isDraggingOver ? "bg-gray-200" : ""}`}
                            >
                                {tasks.length > 0 ? (
                                    tasks.map((task, index) => <Task key={task._id} task={task} index={index} />)
                                ) : (
                                    <p className="text-gray-500 text-sm">No tasks</p>
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div>
        </div>
    );
};

export default Column;
