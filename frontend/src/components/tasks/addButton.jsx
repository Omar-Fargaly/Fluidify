import { useState } from "react";
import Modal from "./modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../libs/api/tasks";

function AddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: addTask, isPending, isError, error } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsOpen(false);
    },
  });

  const handleSave = (newTask) => {
    addTask(newTask);
  };

  return (
    <>
      <button className="btn mt-1" onClick={() => setIsOpen(true)}>
        <img src="./Add-Button.svg" alt="Add Task" className="w-[45px]" />
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
      {isPending && <p className="text-sm text-gray-500">Saving task...</p>}
      {isError && <p className="text-sm text-red-500">Error: {error.message}</p>}
    </>
  );
}

export default AddButton;
