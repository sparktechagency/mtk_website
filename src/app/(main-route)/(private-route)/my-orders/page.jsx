"use client";

import React, { useState } from "react";
import SimpleHero from "@/components/common/SimpleHero";
import PageLayout from "@/components/layout/PageLayout";
import OrderTable from "@/components/my-orders/OrderTable";
import OrderCard from "@/components/my-orders/OrderCard";
import ReviewModal from "@/components/my-orders/ReviewModal";
import { getAllOrders } from "@/api/order/getAllOrders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import emptyAnimation from "../../../../../public/lottie/empty.json";
import { toast } from "sonner";
import { submitReview } from "@/api/review/submitReview";

const MyOrdersPage = () => {
    const queryClient = useQueryClient();

    const { data: ordersData, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders,
    });

    const orders = ordersData?.data || []; 

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const heroLinks = [
        { name: "Home", href: "/" },
        { name: "My Orders", isCurrent: true }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "processing":
                return "text-blue-600";
            case "shipped":
                return "text-purple-600";
            case "delivered":
                return "text-green-600";
            case "cancelled":
                return "text-red-600";
            default:
                return "text-subtitle";
        }
    };

    const handleReviewSubmit = (data) => {
        const reviewBody = {
            orderId: selectedOrder._id,
            productId: data.productId,
            star: data.rating,
            comment: data.comment,
        };
        submitReviewMutation(reviewBody);
    };

    const { mutate: submitReviewMutation, isPending: isSubmittingReview } = useMutation({
        mutationFn: submitReview,
        onSuccess: () => {
            toast.success("Review submitted successfully!");
            queryClient.invalidateQueries(["orders"]);
            setIsReviewModalOpen(false);
            setSelectedOrder(null);
            setSelectedProduct(null);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to submit review."); 
        },
    });

    const handleOpenReviewModal = (order, product) => {
        setSelectedOrder(order);
        setSelectedProduct(product);
        setIsReviewModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-minus-header">
                <SimpleHero title="My Orders" links={heroLinks} />
                <PageLayout>
                    <div className="overflow-x-auto">
                        <div className="min-w-full rounded-md shadow-sm">
                            {/* Table Header Skeleton */}
                            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200">
                                <Skeleton className="h-6 w-24" /> {/* Order ID */}
                                <Skeleton className="h-6 w-20" /> {/* Date */}
                                <Skeleton className="h-6 w-32" /> {/* Products */}
                                <Skeleton className="h-6 w-16" /> {/* Total */}
                                <Skeleton className="h-6 w-20" /> {/* Status */}
                                <Skeleton className="h-6 w-16" /> {/* Action */}
                            </div>

                            {/* Table Rows Skeleton */}
                            <div className="p-4">
                                {Array.from({ length: 7 }).map((_, rowIndex) => (
                                    <div key={rowIndex} className="grid grid-cols-6 gap-4 py-3 border-b border-gray-100 last:border-b-0 items-center">
                                        {/* Order ID */}
                                        <Skeleton className="h-5 w-32" />
                                        {/* Date */}
                                        <Skeleton className="h-5 w-20" />
                                        {/* Product (Image + Text) */}
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-10 w-10 rounded-md" />
                                            <Skeleton className="h-5 w-24" />
                                        </div>
                                        {/* Total */}
                                        <Skeleton className="h-5 w-16" />
                                        {/* Status */}
                                        <Skeleton className="h-5 w-20 rounded-full" />
                                        {/* Action Button */}
                                        <Skeleton className="h-8 w-20 rounded-md" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </PageLayout>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-minus-header">
                <SimpleHero title="My Orders" links={heroLinks} />
                <PageLayout>
                    <div className="text-center text-red-500 py-10">
                        Error loading orders. Please try again later.
                    </div>
                </PageLayout>
            </div>
        );
    }

    return (
        <div className="min-h-minus-header">
            <SimpleHero title="My Orders" links={heroLinks} />

            <PageLayout>
                <div className="overflow-x-auto">
                    <div className="md:min-w-[800px]">
                        {orders.length === 0 ? (
                            <div className="flex flex-col gap-2 items-center justify-center h-[70%] text-subtitle text-lg col-span-full">
                                <Lottie animationData={emptyAnimation} loop={true} style={{ width: 400, height: 400, }} />
                                <p>No orders found.</p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop View */}
                                <OrderTable orders={orders} getStatusColor={getStatusColor} onReview={handleOpenReviewModal} />

                                {/* Mobile View */}
                                <div className="md:hidden flex flex-col gap-4">
                                    {orders.map((order) => (
                                        <OrderCard key={order._id} order={order} getStatusColor={getStatusColor} onReview={handleOpenReviewModal} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <ReviewModal
                    isOpen={isReviewModalOpen}
                    onOpenChange={setIsReviewModalOpen}
                    onSubmit={handleReviewSubmit}
                    isSubmittingReview={isSubmittingReview}
                    initialData={selectedProduct ? { rating: 0, comment: "", productId: selectedProduct.productId } : null}
                />
            </PageLayout>
        </div>
    );
};

export default MyOrdersPage;