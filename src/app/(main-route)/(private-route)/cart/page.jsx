"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { deleteCartItem } from "@/api/product/deleteCartItem";
import { updateCartItem } from "@/api/product/updateCartItem";
import { Separator } from "@/components/ui/separator";
import SimpleHero from '@/components/common/SimpleHero';
import PageLayout from '@/components/layout/PageLayout';
import CartTableHeader from "@/components/cart/CartTableHeader";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { checkout } from "@/api/product/checkout";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";

const CartPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { cart: cartItems, isLoading, isError } = useCart();

    const deleteMutation = useMutation({
        mutationFn: deleteCartItem,
        onSuccess: () => {
            toast.success("Item removed from cart");
            queryClient.invalidateQueries(["cart"]);
        },
        onError: () => {
            toast.error("Failed to remove item from cart");
        }
    });

    const updateMutation = useMutation({
        mutationFn: updateCartItem,
        onSuccess: () => {
            toast.success("Cart updated successfully");
            queryClient.invalidateQueries(["cart"]);
        },
        onError: () => {
            toast.error("Failed to update cart");
        }
    });

    const handleRemoveItem = (id) => {
        deleteMutation.mutate(id);
    };

    const handleQuantityChange = (id, type) => {
        const item = cartItems.find(cartItem => cartItem._id === id);
        if (!item) return;
        let newQuantity = item?.quantity;
        if (type === "increment") {
            newQuantity = item?.quantity + 1;
        } else if (type === "decrement" && item?.quantity > 1) {
            newQuantity = item?.quantity - 1;
        }

        if (newQuantity !== item?.quantity) {
            updateMutation.mutate({ id, quantity: newQuantity });
        }
    };

    const totalItems = cartItems?.length || 0;
    const subTotal = cartItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ) || 0;

    const {mutate : checkoutMutation, isPending: isCheckoutLoading} = useMutation({
        mutationFn: checkout,
        onSuccess: () => {
            toast.success("Checkout successful");
            queryClient.invalidateQueries(["cart"]);
            router.push("/my-orders");
        },
        onError: () => {
            toast.error("Failed to checkout");
        }
    })

    const handleCheckout = () => {
        checkoutMutation()
    };

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
                                            handleQuantityChange={handleQuantityChange}
                                            handleRemoveItem={handleRemoveItem}
                                        />
                                        {index < cartItems.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                        {/* Order Overview */}
                        <OrderSummary totalItems={totalItems} subTotal={subTotal} handleCheckout={handleCheckout} isCheckoutLoading={isCheckoutLoading} />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default CartPage;