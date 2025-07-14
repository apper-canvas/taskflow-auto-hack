import { motion } from "framer-motion";
import Checkbox from "@/components/atoms/Checkbox";

const TaskCheckbox = ({ 
  checked, 
  onChange, 
  disabled = false, 
  className 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Checkbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="cursor-pointer"
      />
    </motion.div>
  );
};

export default TaskCheckbox;