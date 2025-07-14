import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavigationItem = ({ 
  to, 
  icon, 
  label, 
  count = null, 
  color = null,
  className 
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-primary text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          className
        )
      }
    >
      <div className="flex items-center gap-3 flex-1">
        {color && (
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
        )}
        {icon && (
          <ApperIcon 
            name={icon} 
            className="h-4 w-4 flex-shrink-0" 
          />
        )}
        <span className="truncate">{label}</span>
      </div>
      {count !== null && (
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </NavLink>
  );
};

export default NavigationItem;