import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { filterTasksByPriority, filterTasksBySearch } from "@/utils/taskHelpers";
import FilterBar from "@/components/organisms/FilterBar";
import QuickAddBar from "@/components/organisms/QuickAddBar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import BulkSelectionToolbar from "@/components/organisms/BulkSelectionToolbar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";

const TasksPage = () => {
  const { categoryId } = useParams();
  const { categories } = useCategories();
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskComplete, 
    loadTasks 
} = useTasks(categoryId);

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Filter tasks based on search and priority
  const filteredTasks = filterTasksByPriority(
    filterTasksBySearch(tasks, searchQuery),
    priorityFilter
  );
const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask.Id, taskData);
      setEditingTask(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      await toggleTaskComplete(taskId);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const handleTaskSelection = (taskId, isSelected) => {
    setSelectedTasks(prev => {
      if (isSelected) {
        return [...prev, taskId];
      } else {
        return prev.filter(id => id !== taskId);
      }
    });
  };

  const handleBulkDelete = async () => {
    if (selectedTasks.length === 0) return;
    
    const confirmMessage = `Are you sure you want to delete ${selectedTasks.length} selected ${selectedTasks.length === 1 ? 'task' : 'tasks'}?`;
    if (window.confirm(confirmMessage)) {
      try {
        const { bulkDelete } = await import("@/services/api/taskService");
        await bulkDelete(selectedTasks);
        setSelectedTasks([]);
        loadTasks();
      } catch (error) {
        console.error("Failed to delete selected tasks:", error);
      }
    }
  };

  const handleBulkComplete = async () => {
    if (selectedTasks.length === 0) return;
    
    try {
      const { bulkComplete } = await import("@/services/api/taskService");
      await bulkComplete(selectedTasks);
      setSelectedTasks([]);
      loadTasks();
    } catch (error) {
      console.error("Failed to complete selected tasks:", error);
    }
  };

  const handleBulkMoveToCategory = async (categoryId) => {
    if (selectedTasks.length === 0) return;
    
    try {
      const { bulkMoveToCategory } = await import("@/services/api/taskService");
      await bulkMoveToCategory(selectedTasks, categoryId);
      setSelectedTasks([]);
      loadTasks();
    } catch (error) {
      console.error("Failed to move selected tasks:", error);
    }
  };

  const clearSelection = () => {
    setSelectedTasks([]);
  };

  const getPageTitle = () => {
    if (categoryId === "completed") {
      return "Completed Tasks";
    } else if (categoryId) {
      const category = categories.find(cat => cat.id === categoryId);
      return category ? category.name : "Tasks";
    }
    return "All Tasks";
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-gray-600">
              {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>
          {categoryId !== "completed" && (
            <Button
              onClick={() => setShowTaskModal(true)}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto"
            >
              <ApperIcon name="Plus" size={16} />
              Add Task
            </Button>
          )}
        </div>
      </motion.div>

      {categoryId !== "completed" && (
        <QuickAddBar
          categories={categories}
          onAddTask={handleAddTask}
        />
      )}

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
/>

      {filteredTasks.length === 0 ? (
        <Empty
          title="No tasks found"
          description={
            searchQuery || priorityFilter !== "all"
              ? "Try adjusting your filters to find tasks."
              : categoryId === "completed" 
                ? "No completed tasks yet. Complete some tasks to see them here!"
                : "Start by adding your first task above."
          }
          actionLabel={
            searchQuery || priorityFilter !== "all" ? "Clear filters" : "Add Task"
          }
          onAction={() => {
            if (searchQuery || priorityFilter !== "all") {
              setSearchQuery("");
              setPriorityFilter("all");
            } else {
              setShowTaskModal(true);
            }
          }}
        />
      ) : (
        <>
          {selectedTasks.length > 0 && (
            <BulkSelectionToolbar
              selectedCount={selectedTasks.length}
              categories={categories}
              onBulkDelete={handleBulkDelete}
              onBulkComplete={handleBulkComplete}
              onBulkMoveToCategory={handleBulkMoveToCategory}
              onClearSelection={clearSelection}
            />
          )}
          <TaskList
            tasks={filteredTasks}
            categories={categories}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            sortBy={sortBy}
            selectedTasks={selectedTasks}
            onTaskSelection={handleTaskSelection}
          />
        </>
      )}

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        task={editingTask}
        categories={categories}
      />
    </div>
  );
};

export default TasksPage;