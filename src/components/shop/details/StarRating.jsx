
"use client";
import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const StarRating = ({ 
  rating, 
  totalStars = 5, 
  onStarClick, 
  starClassName, 
  containerClassName 
}) => {
  const isInteractive = typeof onStarClick === 'function'; 

  return (
    <div className={cn("flex items-center", containerClassName)}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        const isActive = starNumber <= rating;
        const starClass = cn(
          starClassName,
          "shrink-0",
          isInteractive ? "cursor-pointer" : ""
        );
        
        if (isInteractive) {
          return (
            <button
              key={index}
              type="button"
              onClick={() => onStarClick(starNumber)}
              className={starClass}
            >
              <Star
                size={20}
                className={isActive ? "text-primary fill-primary" : "text-subtitle"}
              />
            </button>
          );
        }

        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
          <Star
            key={index}
            size={20}
            className={cn(
              starClass,
              starNumber <= fullStars
                ? "text-primary fill-primary"
                : hasHalfStar && starNumber === fullStars + 1
                  ? "text-primary fill-primary/10"
                  : "text-subtitle"
            )}
          />
        );
      })}
    </div>
  );
};

export default StarRating;