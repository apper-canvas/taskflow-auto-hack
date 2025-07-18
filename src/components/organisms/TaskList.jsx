import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import BulkSelectionToolbar from "@/components/organisms/BulkSelectionToolbar";
import { sortTasksByDate, sortTasksByPriority } from "@/utils/taskHelpers";
const TaskList = ({ 
  tasks, 
  categories, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  sortBy = "date",
  selectedTasks = [],
  onTaskSelection
}) => {
  const sortedTasks = sortBy === "priority" 
    ? sortTasksByPriority(tasks) 
    : sortTasksByDate(tasks);

  const getTaskCategory = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
<AnimatePresence mode="popLayout">
{sortedTasks.map((task, index) => (
          <TaskCard
            key={task.id || `task-${index}-${task.title?.slice(0,10) || 'unknown'}`}
            key={task?.id || `task-${index}-${Date.now()}`}
            task={task}
            category={getTaskCategory(task.categoryId)}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            isSelected={selectedTasks.includes(task.id)}
            onSelect={onTaskSelection}
            showSelection={selectedTasks.length > 0 || selectedTasks.includes(task.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;