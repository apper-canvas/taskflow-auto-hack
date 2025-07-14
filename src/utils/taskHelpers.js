export const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

export const getPriorityText = (priority) => {
  switch (priority) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
      return "Low";
    default:
      return "None";
  }
};

export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return tasks.sort((a, b) => {
    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
  });
};

export const sortTasksByDate = (tasks) => {
  return tasks.sort((a, b) => {
    // Handle cases where dueDate might be null or undefined
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1; // Tasks without due dates go to end
    if (!b.dueDate) return -1;
    
    // Convert to Date objects for proper comparison
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    
    // Sort in ascending order (earliest dates first)
    return dateA - dateB;
  });
};

export const filterTasksBySearch = (tasks, searchQuery) => {
  if (!searchQuery) return tasks;
  
  const query = searchQuery.toLowerCase();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(query) ||
    (task.description && task.description.toLowerCase().includes(query))
  );
};

export const filterTasksByCategory = (tasks, categoryId) => {
  if (!categoryId || categoryId === "all") return tasks;
  return tasks.filter(task => task.categoryId === categoryId);
};

export const filterTasksByStatus = (tasks, status) => {
  switch (status) {
    case "completed":
      return tasks.filter(task => task.completed);
    case "active":
      return tasks.filter(task => !task.completed);
    default:
      return tasks;
  }
};

export const filterTasksByPriority = (tasks, priority) => {
  if (!priority || priority === "all") return tasks;
  return tasks.filter(task => task.priority === priority);
};

export const generateTaskId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const generateCategoryId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};