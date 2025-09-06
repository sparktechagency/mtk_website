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

export const replaceWhiteBackground = (html) => {
  if (!html) return "";

  return html.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styleProperties = styleString.split(';').filter(prop => prop.trim() !== '');
    
    const filteredProperties = styleProperties.filter(prop => {
      const i = prop.indexOf(':');
      if (i === -1) return true;

      const propName = prop.substring(0, i).trim();
      const propValue = prop.substring(i + 1).trim();
      
      // Exclude 'background-color' only if it's white
      if (propName === 'background-color') {
        const lowerCaseValue = propValue.toLowerCase().replace(/\s/g, '');
        if (
          lowerCaseValue === 'white' ||
          lowerCaseValue === '#fff' ||
          lowerCaseValue === '#ffffff' ||
          lowerCaseValue === 'rgb(255,255,255)'
        ) {
          return false;
        }
      }
      
      return true;
    });
    
    if (filteredProperties.length > 0) {
      const newStyleString = filteredProperties.join('; ');
      return `style="${newStyleString};"`;
    } else {
      return '';
    }
  });
};