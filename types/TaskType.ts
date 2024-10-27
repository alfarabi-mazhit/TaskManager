export type TaskType = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "pending" | "in-progress" | "completed";
};

export type TaskContextType = {
  tasks: TaskType[];
  addTask: (task: Omit<TaskType, "id">) => void;
  updateTaskStatus: (
    id: string,
    newStatus: "pending" | "in-progress" | "completed"
  ) => void;
  deleteTask: (id: string) => void;
};
