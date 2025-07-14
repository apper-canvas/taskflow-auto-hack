import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked, 
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-200",
          checked 
            ? "bg-primary border-primary" 
            : "border-gray-300 bg-white hover:border-gray-400",
          className
        )}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            className="h-3 w-3 text-white animate-spring" 
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;