'use client';

import React, { useEffect, useState } from 'react';
import SimpleHero from '@/components/common/SimpleHero';
import PageLayout from '@/components/layout/PageLayout';
import ShippingAddressForm from '@/components/checkout/ShippingAddressForm';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import { useGetShippingAddress } from '@/hooks/useGetShippingAddress';
import { useUpdateShippingAddress } from '@/hooks/useUpdateShippingAddress';
import { useMutation } from '@tanstack/react-query';
import { checkout } from '@/api/product/checkout';
import { toast } from 'sonner';

const CheckOutPage = () => {
  const { mutateAddress, isAddressUpdatePending } = useUpdateShippingAddress();
  const [shippingAddress, setShippingAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentOption, setPaymentOption] = useState('stripe');

  const { addressData } = useGetShippingAddress();

  useEffect(() => {
    if (addressData) {
      setShippingAddress(addressData);
    }
  }, [addressData]);

  const { mutate: createOrder, isPending: isOrderCreating } = useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      if (data?.success) {
        window.location.href = data?.data?.url;
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to create order.');
    },
  });

  const handlePayment = () => {
    mutateAddress(shippingAddress, {
      onSuccess: () => {
        createOrder();
      },
    });
  };

  const heroLinks = [
    { name: 'Home', href: '/' },
    { name: 'Cart', href: '/cart' },
    { name: 'Checkout', isCurrent: true },
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
                isPending={isAddressUpdatePending || isOrderCreating}
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                handlePayment={handlePayment}
              />
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default CheckOutPage;

