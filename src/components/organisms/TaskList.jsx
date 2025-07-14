import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import { sortTasksByDate, sortTasksByPriority } from "@/utils/taskHelpers";

const TaskList = ({ 
  tasks, 
  categories, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  sortBy = "date" 
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
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            category={getTaskCategory(task.categoryId)}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;