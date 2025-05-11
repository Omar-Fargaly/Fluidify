import TaskItem from "./taskItem";

function TaskList({title}) {
    return ( 
        <>
        <div className="rounded-4xl  text-white text-center space-y-6  xl:border h-fit  px-8 py-7 w-full xl:max-w-[500px] ">
        <h2 className="font-bela hidden sm:block text-5xl">Tasks</h2>
        <div className="max-h-6/12 flex flex-col gap-4 scrollbar-hide">
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            </div>


        </div>
        </>
     );
}

export default TaskList;