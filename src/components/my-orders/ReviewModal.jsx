
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

const reviewSchema = z.object({
    rating: z.number().min(1, "Please select a rating."),
    comment: z.string().min(6, "Comment must be at least 6 characters."),
    productId: z.string().optional(), // Add productId to schema
});

const ReviewModal = ({ isOpen, onOpenChange, onSubmit, initialData }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: initialData?.rating || 0,
            comment: initialData?.comment || "",
            productId: initialData?.productId || "", // Set productId from initialData
        },
    });

    const rating = watch("rating");
    const productId = watch("productId"); // Watch productId

    React.useEffect(() => {
        if (!isOpen) {
            reset({
                rating: initialData?.rating || 0,
                comment: initialData?.comment || "",
                productId: initialData?.productId || "",
            });
        }
    }, [isOpen, reset, initialData]);

    const handleFormSubmit = (data) => {
        onSubmit({ ...data, productId }); // Pass productId to onSubmit
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Review</DialogTitle>
                    <DialogDescription>
                        Share your experience with this product.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium">Rating:</span>
                            <div className="space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button" // Prevent form submission
                                        onClick={() => setValue("rating", star)}
                                        className={`${star <= rating ? "text-primary" : "text-subtitle"}`}
                                    >
                                        <Star size={20} />
                                    </button>
                                ))}
                                {errors.rating && (
                                    <p className="text-red-500 text-xs ml-1">{errors.rating.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="comment" className="text-sm font-medium">
                                Comment:
                            </label>
                            <Textarea
                                id="comment"
                                placeholder="Write your review here..."
                                {...register("comment")}
                            />
                            {errors.comment && (
                                <p className="text-red-500 text-xs ml-1">{errors.comment.message}</p>
                            )}
                        </div>
                    </div>
                    <Button type="submit">
                        Continue
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;
