import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { generateCategoryId } from "@/utils/taskHelpers";

const NewCategoryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "#5B21B6",
  });

  const colorOptions = [
    { label: "Purple", value: "#5B21B6" },
    { label: "Pink", value: "#EC4899" },
    { label: "Blue", value: "#3B82F6" },
    { label: "Green", value: "#10B981" },
    { label: "Yellow", value: "#F59E0B" },
    { label: "Red", value: "#EF4444" },
    { label: "Indigo", value: "#6366F1" },
    { label: "Orange", value: "#F97316" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: generateCategoryId(),
      name: formData.name.trim(),
      color: formData.color,
    };
    onSubmit(newCategory);
    setFormData({ name: "", color: "#5B21B6" });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              New Category
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
              label="Category Name"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange("color", option.value)}
                    className={`w-12 h-8 rounded-md border-2 transition-all ${
                      formData.color === option.value
                        ? "border-gray-900 ring-2 ring-gray-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    style={{ backgroundColor: option.value }}
                    title={option.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Create Category
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

export default NewCategoryModal;