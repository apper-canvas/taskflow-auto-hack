import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  id, 
  error, 
  type = "input", 
  className, 
  children,
  ...props 
}) => {
  const renderField = () => {
    switch (type) {
      case "textarea":
        return <TextArea id={id} {...props} />;
      case "select":
        return <Select id={id} {...props}>{children}</Select>;
      default:
        return <Input id={id} type={type} {...props} />;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </Label>
      )}
      {renderField()}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;