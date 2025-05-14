import TaskItem from "./taskItem";

function TaskList({ completed, priority, tasks = [] }) {
  let title = "Tasks";

  const filteredTasks = tasks.filter((task) => {
    let matches = true;

    if (completed === undefined) {
      matches = matches && !task.completed;
    } else {
      matches = matches && task.completed === completed;
    }

    if (priority) {
      matches = matches && task.priority === priority;
    }

    return matches;
  });

  if (completed !== undefined) {
    title = completed ? "Completed" : "Pending";
  } else if (priority) {
    if (priority === "high") title = "Urgent";
    else if (priority === "medium") title = "Semi-Urgent";
    else if (priority === "low") title = "Take your time";
  }

  // Determine background color
  let bgColorClass = "xl:bg-gray-800/60"; // default (normal)
  if (completed) {
    bgColorClass = "xl:bg-green-800/60";
  } else if (priority) {
    switch (priority) {
      case "low":
        bgColorClass = "xl:bg-green-500";
        break;
      case "medium":
        bgColorClass = "xl:bg-yellow-500";
        break;
      case "high":
        bgColorClass = "xl:bg-red-500";
        break;
    }
  }

  return (
    <div
      className={`rounded-4xl text-white text-center space-y-6 xl:border h-fit px-8 py-7 w-full xl:max-w-[500px] bg-transparent ${bgColorClass}`}
    >
      <h2 className="font-bela hidden sm:block text-5xl">{title}</h2>
      <div className="max-h-6/12 flex flex-col gap-4 scrollbar-hide">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskItem key={task._id} task={task} />)
        ) : (
          <p className="text-gray-300 py-3">Currently No Tasks Available.</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;
