import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";
import { toast } from "react-toastify";

export const useTasks = (categoryId = null) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (categoryId === "completed") {
        data = await taskService.getCompleted();
      } else if (categoryId && categoryId !== "all") {
        data = await taskService.getByCategory(categoryId);
      } else {
        data = await taskService.getActive();
      }
      
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully");
      return newTask;
    } catch (err) {
      toast.error("Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ));
      toast.success("Task updated successfully");
      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
      throw err;
    }
  };

  const toggleTaskComplete = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id);
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ));
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
      
      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  const bulkDeleteTasks = async (ids) => {
    try {
      await taskService.bulkDelete(ids);
      setTasks(prev => prev.filter(task => !ids.includes(task.Id)));
      toast.success(`${ids.length} tasks deleted successfully`);
    } catch (err) {
      toast.error("Failed to delete tasks");
      throw err;
    }
  };

  useEffect(() => {
    loadTasks();
  }, [categoryId]);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    bulkDeleteTasks,
  };
};