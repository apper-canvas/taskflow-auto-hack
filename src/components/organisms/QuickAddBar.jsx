import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { generateTaskId } from "@/utils/taskHelpers";

const QuickAddBar = ({ categories, onAddTask, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: generateTaskId(),
      title: title.trim(),
      description: "",
      categoryId,
      priority,
      dueDate: null,
      recurring: "none",
    };

    onAddTask(newTask);
    setTitle("");
    setIsExpanded(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setTitle("");
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-3 w-full text-left text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ApperIcon name="Plus" className="h-5 w-5" />
          <span>Add a task...</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full"
          />
          
          <div className="flex items-center gap-3">
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="flex-1"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button type="submit" size="sm">
              Add Task
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default QuickAddBar;