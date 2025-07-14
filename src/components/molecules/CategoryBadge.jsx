import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const CategoryBadge = ({ category, size = "sm", className }) => {
  if (!category) return null;

  const sizeStyles = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <Badge
      className={cn(
        "font-medium",
        sizeStyles[size],
        className
      )}
      style={{ 
        backgroundColor: `${category.color}20`,
        color: category.color,
        borderColor: `${category.color}30`,
      }}
    >
      {category.name}
    </Badge>
  );
};

export default CategoryBadge;