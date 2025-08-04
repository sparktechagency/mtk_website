'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

const SuccessPage = () => {
  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default SuccessPage;