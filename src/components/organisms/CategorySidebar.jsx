import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import NavigationItem from "@/components/molecules/NavigationItem";
import ApperIcon from "@/components/ApperIcon";
import NewCategoryModal from "@/components/organisms/NewCategoryModal";

const CategorySidebar = ({ categories, loading, onCreateCategory, className }) => {
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

  const handleCreateCategory = async (categoryData) => {
    try {
      await onCreateCategory(categoryData);
      setShowNewCategoryModal(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <>
      <motion.div
        className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNewCategoryModal(true)}
            className="h-8 w-8 p-0"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="space-y-1">
          <NavigationItem
            to="/"
            icon="Home"
            label="All Tasks"
            count={categories.reduce((sum, cat) => sum + cat.taskCount, 0)}
          />
          
          <NavigationItem
            to="/completed"
            icon="CheckCircle"
            label="Completed"
          />
          
          <div className="my-3 border-t border-gray-200" />
          
          {loading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <NavigationItem
                key={category.id}
                to={`/category/${category.id}`}
                label={category.name}
                count={category.taskCount}
                color={category.color}
              />
            ))
          )}
        </nav>
      </motion.div>

      <NewCategoryModal
        isOpen={showNewCategoryModal}
        onClose={() => setShowNewCategoryModal(false)}
        onSubmit={handleCreateCategory}
      />
    </>
  );
};

export default CategorySidebar;