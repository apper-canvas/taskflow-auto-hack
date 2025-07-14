import tasksData from "@/services/mockData/tasks.json";
import { getNextRecurringDate } from "@/utils/dateHelpers";
import { categoryService } from "./categoryService";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(250);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    
    // Update category task count
    await categoryService.updateTaskCount(newTask.categoryId, 1);
    
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    tasks[index] = { ...tasks[index], ...taskData };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    
    // Update category task count
    await categoryService.updateTaskCount(deletedTask.categoryId, -1);
    
    return { success: true };
  },

  async toggleComplete(id) {
    await delay(250);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const task = tasks[index];
    const wasCompleted = task.completed;
    tasks[index] = { ...task, completed: !task.completed };
    
    // Handle recurring tasks
    if (!wasCompleted && task.recurring && task.recurring !== "none") {
      const nextDate = getNextRecurringDate(task.dueDate, task.recurring);
      if (nextDate) {
        const newRecurringTask = {
          ...task,
          Id: Math.max(...tasks.map(t => t.Id)) + 1,
          id: `${task.id}-${Date.now()}`,
          dueDate: nextDate.toISOString(),
          completed: false,
          createdAt: new Date().toISOString(),
        };
        tasks.push(newRecurringTask);
      }
    }
    
    return { ...tasks[index] };
  },

  async getByCategory(categoryId) {
    await delay(200);
    return tasks.filter(t => t.categoryId === categoryId);
  },

  async getCompleted() {
    await delay(200);
    return tasks.filter(t => t.completed);
  },

  async getActive() {
    await delay(200);
    return tasks.filter(t => !t.completed);
  },

  async bulkDelete(ids) {
    await delay(400);
    const deletedTasks = [];
    
    ids.forEach(id => {
      const index = tasks.findIndex(t => t.Id === parseInt(id));
      if (index !== -1) {
        deletedTasks.push(tasks[index]);
        tasks.splice(index, 1);
      }
    });
    
    // Update category task counts
    const categoryUpdates = {};
    deletedTasks.forEach(task => {
      categoryUpdates[task.categoryId] = (categoryUpdates[task.categoryId] || 0) + 1;
    });
    
    for (const [categoryId, count] of Object.entries(categoryUpdates)) {
      await categoryService.updateTaskCount(categoryId, -count);
    }
    
    return { success: true, deletedCount: deletedTasks.length };
  }
};