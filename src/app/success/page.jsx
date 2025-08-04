'use client';

import React, { Suspense } from 'react';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import api from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const SuccessContent = () => {
  const params = useSearchParams();
  const sessionId = params.get('session_Id');

  const { isPending, isError, error } = useQuery({
    queryKey: ['verify-session', sessionId],
    queryFn: () => api.get(`/order/verify-session?session_Id=${sessionId}`),
    enabled: !!sessionId, // Only run if sessionId exists
    retry: false, // Optional: prevent retrying on failure
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "There was an issue confirming your payment.");
    }
  });

  if (isPending) {
    return (
      <div className="container mx-auto py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
        <h1 className="text-2xl font-bold text-title mb-4">Verifying Your Payment</h1>
        <p className="text-lg text-subtitle">Please wait a moment, we are confirming your transaction.</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h1 className="text-2xl font-bold text-red-500 mb-4">Payment Verification Failed</h1>
        <p className="text-lg text-subtitle">{error?.response?.data?.message || "There was an issue confirming your payment."}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold text-title mb-4">Payment Successful!</h1>
      <p className="text-lg text-subtitle mb-8">Thank you for your purchase. Your order has been confirmed.</p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/my-orders">View Orders</Link>
        </Button>
      </div>
    </div>
  );
}

const SuccessPage = () => {
  return (
    <PageLayout>
      <Suspense fallback={
        <div className="container mx-auto py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
          <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
          <h1 className="text-2xl font-bold text-title mb-4">Loading Page...</h1>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </PageLayout>
  );
};

export default SuccessPage;