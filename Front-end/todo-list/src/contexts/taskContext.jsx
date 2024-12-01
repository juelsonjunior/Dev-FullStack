import { createContext, useState } from "react";
import { countTask, getAllTasks, insertTask } from "../utils/functions";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const listTaks = () => {
    getAllTasks("list-tasks", setTasks, setIsLoading);
  };

  const addTask = async (valueTask, loading) => {
    await insertTask("insert-task", valueTask, loading);
    listTaks();
  };

  const countTasks = () => {
    countTask("count-task", setCount)
  }  
  

  return (
    <TaskContext.Provider value={{ tasks, isLoading, listTaks, addTask, countTasks, count }}>
      {children}
    </TaskContext.Provider>
  );
};
