"use client";

import React, { useEffect, useState } from "react";
import SimpleHero from '@/components/common/SimpleHero';
import PageLayout from '@/components/layout/PageLayout';
import ShippingAddressForm from "@/components/checkout/ShippingAddressForm";
import PaymentOptions from "@/components/checkout/PaymentOptions";
import { useGetShippingAddress } from "@/hooks/useGetShippingAddress";


const CheckOutPage = () => {

    const [shippingAddress, setShippingAddress] = useState({
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
    });
    const [paymentOption, setPaymentOption] = useState("stripe");
    
    const { addressData } = useGetShippingAddress()

    useEffect(() => {
        if (addressData) {
            setShippingAddress(addressData);
        }
    }, [addressData]);
    
    

    const heroLinks = [
        { name: "Home", href: "/" },
        { name: "Cart", href: "/cart" },
        { name: "Checkout", isCurrent: true },
    ];

    return (
        <div className="min-h-minus-header">
            <SimpleHero title="Checkout" links={heroLinks} />
            <PageLayout>
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                        <div>
                            <ShippingAddressForm
                                shippingAddress={shippingAddress}
                                setShippingAddress={setShippingAddress}
                            />
                            <PaymentOptions
                                paymentOption={paymentOption}
                                setPaymentOption={setPaymentOption}
                            />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default CheckOutPage;
