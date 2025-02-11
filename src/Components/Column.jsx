import Task from "./Task";
import clsx from "clsx"; // Install clsx: npm install clsx

const Column = ({ header, color }) => {
    return (
        <div className="mx-4">
            <div className="border-[1px] rounded-md inline-block w-[22em]">
                {/* Dynamically set background color */}
                <div className={clsx("px-4 py-2 flex rounded-md items-center justify-between", color)}>
                    <h3 className="font-bold text-lg text-white">{header}</h3>
                    <b className="bg-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
                        3
                    </b>
                </div>
                <div className="px-2 mt-1 py-2">
                    <Task />
                </div>
            </div>
        </div>
    );
};

export default Column;
