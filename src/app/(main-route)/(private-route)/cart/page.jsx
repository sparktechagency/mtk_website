"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/api/product/getCart";
import { Separator } from "@/components/ui/separator";
import SimpleHero from '@/components/common/SimpleHero';
import PageLayout from '@/components/layout/PageLayout';
import CartTableHeader from "@/components/cart/CartTableHeader";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { Skeleton } from "@/components/ui/skeleton";

const CartPage = () => {
    const { data: cartItems, isLoading, isError } = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
    });

    const totalItems = cartItems?.length || 0;
    const subTotal = cartItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ) || 0;

    const heroLinks = [
        { name: "Home", href: "/" },
        { name: "Cart", isCurrent: true }
    ];

    return (
        <div className='min-h-minus-header'>
            <SimpleHero title="Cart" links={heroLinks} />

            <PageLayout>
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Product List */}
                        <div className="lg:col-span-2 p-4 md:p-6">
                            <CartTableHeader />

                            {/* Product Items */}
                            {isLoading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-24 w-full" />
                                    <Skeleton className="h-24 w-full" />
                                    <Skeleton className="h-24 w-full" />
                                </div>
                            ) : isError ? (
                                <div className="text-center py-10 text-red-500">Failed to load cart items.</div>
                            ) : cartItems.length === 0 ? (
                                <div className="text-center py-10 text-subtitle">Your cart is empty.</div>
                            ) : (
                                cartItems.map((item, index) => (
                                    <React.Fragment key={item._id}>
                                        <CartItem
                                            item={item}
                                            // handleQuantityChange={handleQuantityChange}
                                            // handleRemoveItem={handleRemoveItem}
                                        />
                                        {index < cartItems.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                        {/* Order Overview */}
                        <OrderSummary totalItems={totalItems} subTotal={subTotal} />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default CartPage;