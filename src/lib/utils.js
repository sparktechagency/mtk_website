import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



// get status color
export const getStatusColor = (status) => {
  switch (status) {
    case "processing":
      return "text-blue-600";
    case "shipped":
      return "text-purple-600";
    case "delivered":
      return "text-green-600";
    case "cancelled":
      return "text-red-600";
    case "pending":
      return "text-amber-500";
    case "failled":
      return "text-red-500";
    case "paid":
      return "text-green-500";
    default:
      return "text-subtitle";
  }
};
