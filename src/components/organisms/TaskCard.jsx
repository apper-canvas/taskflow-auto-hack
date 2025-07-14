import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import TaskCheckbox from "@/components/molecules/TaskCheckbox";
import PriorityDot from "@/components/molecules/PriorityDot";
import DateDisplay from "@/components/molecules/DateDisplay";
import CategoryBadge from "@/components/molecules/CategoryBadge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { isOverdue } from "@/utils/dateHelpers";

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  className 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    try {
      await onToggleComplete(task.Id);
    } finally {
      setIsCompleting(false);
    }
  };

  const isTaskOverdue = isOverdue(task.dueDate);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200",
        "hover:shadow-hover hover:border-gray-300",
        task.completed && "opacity-75",
        isTaskOverdue && !task.completed && "border-l-4 border-l-error",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <TaskCheckbox
          checked={task.completed}
          onChange={handleToggleComplete}
          disabled={isCompleting}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <PriorityDot priority={task.priority} />
              <h3
                className={cn(
                  "font-medium text-gray-900 truncate",
                  task.completed && "line-through text-gray-500"
                )}
              >
                {task.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="h-8 w-8 p-0"
              >
                <ApperIcon name="Edit2" className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.Id)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-error"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {task.description && (
            <p
              className={cn(
                "text-sm text-gray-600 mt-1",
                task.completed && "line-through text-gray-400"
              )}
            >
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <DateDisplay date={task.dueDate} />
              {task.recurring && task.recurring !== "none" && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <ApperIcon name="RotateCcw" className="h-4 w-4" />
                  <span className="capitalize">{task.recurring}</span>
                </div>
              )}
            </div>
            
            <CategoryBadge category={category} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;