import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const BulkSelectionToolbar = ({
  selectedCount,
  categories,
  onBulkDelete,
  onBulkComplete,
  onBulkMoveToCategory,
  onClearSelection
}) => {
  const [showMoveDropdown, setShowMoveDropdown] = useState(false);

  const handleMoveToCategory = (categoryId) => {
    onBulkMoveToCategory(categoryId);
    setShowMoveDropdown(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-primary font-medium">
            <ApperIcon name="CheckSquare" size={18} />
            <span>
              {selectedCount} {selectedCount === 1 ? "task" : "tasks"} selected
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBulkComplete}
            className="text-success hover:bg-success/10"
          >
            <ApperIcon name="Check" size={16} />
            Complete Selected
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoveDropdown(!showMoveDropdown)}
              className="text-info hover:bg-info/10"
            >
              <ApperIcon name="FolderOpen" size={16} />
              Move to Category
              <ApperIcon name="ChevronDown" size={14} />
            </Button>
            
            {showMoveDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border z-50 min-w-[180px]"
              >
                <div className="p-2 space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleMoveToCategory(category.id)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center gap-2"
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onBulkDelete}
            className="text-error hover:bg-error/10"
          >
            <ApperIcon name="Trash2" size={16} />
            Delete Selected
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-gray-500 hover:bg-gray-100"
          >
            <ApperIcon name="X" size={16} />
            Clear
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BulkSelectionToolbar;