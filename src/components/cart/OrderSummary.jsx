import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'; 
import { Loader2 } from 'lucide-react';

const OrderSummary = ({ totalItems, subTotal, handleCheckout , isCheckoutLoading}) => {
    return (
        <div className="lg:col-span-1 p-6 rounded-lg border bg-content-bg">
            <h2 className="text-xl font-medium text-title mb-4">Order Overview</h2>
            <div className="space-y-3">
                <div className="flex justify-between items-center text-subtitle">
                    <span>Total Items:</span>
                    <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center text-subtitle">
                    <span>Sub Total:</span>
                    <span className="font-semibold">${subTotal.toFixed(2)}</span>
                </div>
            </div>
            <Separator className="my-6" />
            <Link href="/cart/checkout" className="w-full">
                <Button disabled={isCheckoutLoading || totalItems === 0} onClick={handleCheckout} className="w-full font-medium py-3">
                    {isCheckoutLoading ? <><Loader2 className=" h-4 w-4 animate-spin" /> Checking out</> : "Checkout"}
                </Button>
            </Link>
        </div>
    );
};

export default OrderSummary;
