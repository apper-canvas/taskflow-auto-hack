import { cn } from "@/utils/cn";
import { getPriorityColor } from "@/utils/taskHelpers";

const PriorityDot = ({ priority, size = "sm", className }) => {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div
      className={cn(
        "rounded-full flex-shrink-0",
        sizes[size],
        getPriorityColor(priority),
        className
      )}
    />
  );
};

export default PriorityDot;