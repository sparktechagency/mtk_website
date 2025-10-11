import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from 'lucide-react';

const PaymentOptions = ({ paymentOption, setPaymentOption, handlePayment, isPending }) => {

    return (
        <div className="p-6 rounded-lg border h-fit mt-8">
            <h2 className="text-2xl font-medium text-title mb-6">Payment Options</h2>
            <div className="flex gap-3">
                <RadioGroup
                    defaultValue="stripe"
                    value={paymentOption}
                    onValueChange={setPaymentOption}
                    className="flex items-center"
                >
                    <Label
                        htmlFor="Stripe"
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentOption === "Stripe" ? "border-primary shadow-sm" : "border-gray-200"}`}>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="Stripe" id="Stripe" />
                        </div>
                        <Image src="/images/stripe.png" alt="Stripe" width={80} height={80} className="object-contain px-3 rounded" />
                    </Label>
                    <Label
                        htmlFor="PayNow"
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${paymentOption === "PayNow" ? "border-primary shadow-sm" : "border-gray-200"}`}>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="PayNow" id="PayNow" />
                        </div>
                        <Image src="/images/paynow.png" alt="PayNow" width={80} height={80} className="object-contain px-3 rounded" />
                    </Label>
                </RadioGroup>
            </div>
            <Button disabled={isPending} onClick={handlePayment} className="w-full font-medium mt-8">
                {isPending ? <><Loader2 className=" h-4 w-4 animate-spin" />Loading</> : `Pay with ${paymentOption}`}
            </Button>
        </div>
    );
};

export default PaymentOptions;