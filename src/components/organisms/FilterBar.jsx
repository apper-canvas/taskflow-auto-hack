import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  priorityFilter, 
  onPriorityFilterChange,
  sortBy,
  onSortChange,
  className 
}) => {
  return (
    <motion.div
      className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <SearchBar
            placeholder="Search tasks..."
            onSearch={onSearchChange}
            value={searchQuery}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="w-32"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSortChange(sortBy === "date" ? "priority" : "date")}
            className="flex items-center gap-2"
          >
            <ApperIcon 
              name={sortBy === "date" ? "Calendar" : "Flag"} 
              className="h-4 w-4" 
            />
            Sort by {sortBy === "date" ? "Date" : "Priority"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;