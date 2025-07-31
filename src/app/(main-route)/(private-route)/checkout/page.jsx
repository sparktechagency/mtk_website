"use client";

import { useState } from "react";
import OrderDetails from "@/components/checkout/OrderDetails";
import PaymentOptions from "@/components/checkout/PaymentOptions";
import ShippingAddressForm from "@/components/checkout/ShippingAddressForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    // This data will come from the previous page or API call
    const orderData = {
        products: [
            {
                productId: "68836ddb95d774c2e4fb5de9",
                name: "Pokemon",
                price: 40,
                quantity: 1,
                total: 40,
                image: "https://res.cloudinary.com/dwok2hmb7/image/upload/v1753785163/MTK-Ecommerce/erwefh2wyrwxhouotrw2.png",
                _id: "688b0afd5cbc98763097bebc"
            }
        ],
        totalPrice: 40,
        paymentStatus: "unpaid",
        status: "processing",
        _id: "688b0afd5cbc98763097bebb",
        createdAt: "2025-07-31T06:19:41.649Z",
        updatedAt: "2025-07-31T06:19:41.649Z"
    };

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleSubmitOrder = () => {
        // Logic to submit the order with shippingAddress and paymentMethod
        console.log("Submitting order:", { shippingAddress, paymentMethod, orderData });
        // You would typically make an API call here
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Step {activeStep}: {activeStep === 1 ? "Shipping Address" : "Payment Options"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {activeStep === 1 && (
                                <ShippingAddressForm onSubmit={setShippingAddress} onNext={handleNext} />
                            )}
                            {activeStep === 2 && (
                                <PaymentOptions onSubmit={setPaymentMethod} onNext={handleNext} onBack={handleBack} />
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <OrderDetails products={orderData.products} totalPrice={orderData.totalPrice} />
                    {activeStep === 2 && (
                        <Button onClick={handleSubmitOrder} className="w-full mt-4">Place Order</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;