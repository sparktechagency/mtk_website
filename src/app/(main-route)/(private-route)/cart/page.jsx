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
import { useRouter } from "next/navigation";
import useInitializeCart from "@/hooks/useCart";

const CartPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { cartData: cartItems, isLoading, isError } = useInitializeCart();

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

    const { mutate: updateMutation, isPending: isUpdatePending } = useMutation({
        mutationFn: updateCartItem,
        onMutate: async (newItem) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['cart'] });

            // Snapshot the previous value
            const previousCart = queryClient.getQueryData(['cart']);

            // Optimistically update to the new value
            queryClient.setQueryData(['cart'], (old) =>
                old.map((item) =>
                    item._id === newItem.id ? { ...item, quantity: newItem.quantity } : item
                )
            );

            return { previousCart };
        },
        onSuccess: () => {
            toast.success("Cart updated successfully");
            queryClient.invalidateQueries(["cart"]);
        },
        onError: (err, newItem, context) => {
            toast.error("Failed to update cart");
            // Rollback to the previous value
            queryClient.setQueryData(['cart'], context.previousCart);
        },
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
            updateMutation({ id, quantity: newQuantity });
        }
    };

    const totalItems = cartItems?.length || 0;
    const subTotal = cartItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ) || 0;

    const handleCheckout = () => {
        router.push("/checkout");
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
                                <div className="space-y-0">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between w-full p-4 rounded-md"
                                        >
                                            {/* Image skeleton */}
                                            <Skeleton className="h-16 w-16 rounded-md" />

                                            {/* Text skeleton */}
                                            <div className="flex-1 ml-4 space-y-2">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-4 w-20" />
                                            </div>

                                            {/* Quantity skeleton */}
                                            <Skeleton className="h-8 w-20 mx-4" />

                                            {/* Total price skeleton */}
                                            <Skeleton className="h-4 w-12" />

                                            {/* Delete icon skeleton */}
                                            <Skeleton className="h-6 w-6 ml-4" />
                                        </div>
                                    ))}
                                </div>

                            ) : isError ? (
                                <div className="text-center py-10 text-red-500">Failed to load cart items.</div>
                            ) : !cartItems || cartItems.length === 0 ? (
                                <div className="text-center py-10 text-subtitle">Your cart is empty.</div>
                            ) : (
                                cartItems.map((item, index) => (
                                    <React.Fragment key={item._id}>
                                        <CartItem
                                            item={item}
                                            handleQuantityChange={handleQuantityChange}
                                            handleRemoveItem={handleRemoveItem}
                                            isUpdatePending={isUpdatePending}
                                        />
                                        {index < cartItems.length - 1 && <Separator />}
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                        {/* Order Overview */}
                        <OrderSummary totalItems={totalItems} subTotal={subTotal} handleCheckout={handleCheckout} />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default CartPage;