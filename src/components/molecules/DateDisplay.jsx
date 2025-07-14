import { cn } from "@/utils/cn";
import { formatDate, isOverdue, isDueToday } from "@/utils/dateHelpers";
import ApperIcon from "@/components/ApperIcon";

const DateDisplay = ({ date, className }) => {
  if (!date) return null;

  const isOverdueTask = isOverdue(date);
  const isDueTodayTask = isDueToday(date);

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm",
        isOverdueTask && "text-error",
        isDueTodayTask && "text-warning",
        !isOverdueTask && !isDueTodayTask && "text-gray-500",
        className
      )}
    >
      <ApperIcon 
        name="Calendar" 
        className="h-4 w-4" 
      />
      <span className="font-medium">
        {formatDate(date)}
      </span>
    </div>
  );
};

export default DateDisplay;