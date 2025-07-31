"use client";

import React from "react";
import SimpleHero from "@/components/common/SimpleHero";
import PageLayout from "@/components/layout/PageLayout";
import OrderTable from "@/components/my-orders/OrderTable";
import OrderCard from "@/components/my-orders/OrderCard";
import ReviewModal from "@/components/my-orders/ReviewModal";
import { getAllOrders } from "@/api/order/getAllOrders";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Lottie from "lottie-react";
import emptyAnimation from "../../../../../public/lottie/empty.json";

const MyOrdersPage = () => {


    const { data: ordersData, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders,
    });

    const orders = ordersData || [];

    const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState(null);

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
        console.log("Review Data for Order:", selectedOrder._id, data);
        setIsReviewModalOpen(false);
        setSelectedOrder(null);
    };

    const handleOpenReviewModal = (order) => {
        setSelectedOrder(order);
        setIsReviewModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-minus-header">
                <SimpleHero title="My Orders" links={heroLinks} />
                <PageLayout>
                    <div className="overflow-x-auto">
                        <div className="md:min-w-[800px]">
                            <div className="flex flex-col gap-2 items-center justify-center h-[70%] text-subtitle text-lg col-span-full">
                                <Skeleton className="h-4 w-full mb-4" />
                            </div>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Skeleton key={index} className="h-24 w-full mb-2" />
                            ))}
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
                    // initialData={selectedProduct ? { rating: 0, comment: "", productId: selectedProduct.productId } : null}
                />
            </PageLayout>
        </div>
    );
};

export default MyOrdersPage;