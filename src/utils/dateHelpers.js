import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday, startOfDay, endOfDay, addDays, addWeeks, addMonths } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";
  
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return "Today";
  }
  
  if (isTomorrow(dateObj)) {
    return "Tomorrow";
  }
  
  if (isYesterday(dateObj)) {
    return "Yesterday";
  }
  
  return format(dateObj, "MMM d");
};

export const formatDateTime = (date) => {
  if (!date) return "";
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
};

export const formatRelativeTime = (date) => {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const isOverdue = (date) => {
  if (!date) return false;
  return new Date(date) < startOfDay(new Date());
};

export const isDueToday = (date) => {
  if (!date) return false;
  return isToday(new Date(date));
};

export const isDueTomorrow = (date) => {
  if (!date) return false;
  return isTomorrow(new Date(date));
};

export const getNextRecurringDate = (date, recurring) => {
  if (!date || !recurring || recurring === "none") return null;
  
  const baseDate = new Date(date);
  
  switch (recurring) {
    case "daily":
      return addDays(baseDate, 1);
    case "weekly":
      return addWeeks(baseDate, 1);
    case "monthly":
      return addMonths(baseDate, 1);
    default:
      return null;
  }
};

export const sortTasksByDate = (tasks) => {
  return tasks.sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
};