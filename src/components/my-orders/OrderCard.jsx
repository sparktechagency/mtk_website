"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const OrderCard = ({ order, getStatusColor, onReview }) => {
    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-title">Order ID: {order._id.slice(0, 8)}...</span>
                    <span className="text-xs text-subtitle">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <span className={`text-sm font-medium capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
            </div>
            <div className="flex flex-col gap-3">
                {order.products.map((product) => (
                    <div key={product.productId} className="flex items-center gap-4">
                        <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden border">
                            <Image
                                src={product.image}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                        <div className="flex flex-col flex-grow">
                            <span className="font-medium text-title mb-1">{product.name}</span>
                            <span className="text-sm text-subtitle">Qty: {product.quantity}</span>
                            <span className="text-md font-semibold text-title mt-1">Price: ${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-md font-semibold text-title text-right">Total: ${order.totalPrice.toFixed(2)}</div>
            <div className="flex flex-col gap-2">
                {order.products.map((product) => (
                    <Dialog key={product.productId}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className={`w-full text-primary hover:bg-primary/5 border-primary/20 ${order.status !== "delivered" || product.isReview ? "text-subtitle border-gray-400" : ""}`}
                                disabled={order.status !== "delivered" || product.isReview}
                                onClick={() => onReview(order, product)}
                            >
                                Write a Review for
                            </Button>
                        </DialogTrigger>
                    </Dialog>
                ))}
            </div>
        </div>
    );
};

export default OrderCard;