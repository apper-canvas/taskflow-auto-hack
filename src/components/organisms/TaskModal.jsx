import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const TaskModal = ({ isOpen, onClose, onSubmit, task = null, categories = [] }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: "",
    recurring: "none",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        categoryId: task.categoryId || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm") : "",
        recurring: task.recurring || "none",
      });
} else {
      setFormData({
        title: "",
        description: "",
        categoryId: categories[0]?.id || "",
        priority: "medium",
        dueDate: "",
        recurring: "none",
      });
    }
    setErrors({});
  }, [task, categories, isOpen]);

const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    };
    onSubmit(submitData);
    onClose();
  };

const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {task ? "Edit Task" : "New Task"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <ApperIcon name="X" className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
<FormField
              label="Title"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              error={errors.title}
              required
            />

            <FormField
              label="Description"
              id="description"
              type="textarea"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />

<FormField
              label="Category"
              id="categoryId"
              type="select"
              value={formData.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              error={errors.categoryId}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </FormField>

            <FormField
              label="Priority"
              id="priority"
              type="select"
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </FormField>

            <FormField
              label="Due Date"
              id="dueDate"
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />

            <FormField
              label="Recurring"
              id="recurring"
              type="select"
              value={formData.recurring}
              onChange={(e) => handleChange("recurring", e.target.value)}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </FormField>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" className="flex-1">
                {task ? "Update Task" : "Create Task"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;