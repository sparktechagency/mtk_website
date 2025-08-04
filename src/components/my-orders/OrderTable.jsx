
"use client";

import React from "react";
import Image from "next/image";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CheckCheck } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

const OrderTable = ({ orders, onReview }) => {
    return (
        <Table className="hidden md:table">
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Payment Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders?.map((order) => (
                    <TableRow key={order?._id}>
                        <TableCell className="font-medium">{order.token}</TableCell>
                        <TableCell>{new Date(order?.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-2">
                                {order?.products.map((product) => (
                                    <div key={product?.productId} className="flex items-center gap-2">
                                        <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden border">
                                            <Image
                                                src={product?.image}
                                                alt={product?.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-title">{product?.name}</span>
                                            <span className="text-sm text-subtitle">Qty: {product?.quantity} | <span className="font-semibold">Price: ${product?.price.toFixed(2)}</span></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">${order?.totalPrice.toFixed(2)}</TableCell>
                        <TableCell className={`text-center font-medium capitalize ${getStatusColor(order?.status)}`}>
                            {order?.status}
                        </TableCell>
                        <TableCell className={`text-center font-medium capitalize ${getStatusColor(order?.paymentStatus)}`}>
                            {order?.paymentStatus}
                        </TableCell>
                        <TableCell className="text-center">
                            <div className="flex flex-col gap-2">
                                {order?.products?.map((product) => (
                                    <Dialog key={product.productId}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`text-primary hover:bg-primary/5 border-primary/20 ${order?.status !== "delivered" || product?.isReview ? "text-subtitle border-gray-400" : ""}`}
                                                disabled={order?.status !== "delivered" || product?.isReview}
                                                onClick={() => onReview(order, product)}
                                            >
                                                {product?.isReview ?<><CheckCheck color="#1abe56" />Reviewed</> : "Review"}
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default OrderTable;
