import Task from "./Task";

const Column = ({ header, color, tasks }) => {
    return (
        <div className="mx-4">
            <div className="border-[1px] h-[72vh] md:h-[36rem] overflow-y-scroll bg-gray-50 rounded-md inline-block w-[22em]">
                <div className={`${color} px-4 py-2 flex rounded-md items-center justify-between`}>
                    <h3 className="font-bold text-lg text-white">{header}</h3>
                    <b className="bg-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
                        {tasks.length} {/* Display task count */}
                    </b>
                </div>
                <div className="px-2 mt-1 py-2">
                    {tasks.length > 0 ? (
                        tasks.map(task => <Task key={task._id} task={task} />)
                    ) : (
                        <p className="text-gray-500 text-sm">No tasks</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Column;
