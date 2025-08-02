"use client";

import SimpleHero from "@/components/common/SimpleHero";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import { useGetFaq } from "@/hooks/useGetFaq";
import { Skeleton } from "@/components/ui/skeleton";

const heroLinks = [
    { name: "Home", href: "/" },
    { name: "FAQs", isCurrent: true }
];
const FAQ = () => {

    const { FAQs, isLoading, isError } = useGetFaq();

    return (
        <div className="min-h-minus-header">
            <SimpleHero title="FAQs" links={heroLinks} />

            <PageLayout>
                <div className="mb-8">
                    <h2 className="text-xl text-title font-medium mb-2">Welcome to our FAQ section!</h2>
                    <p className="text-subtitle text-sm">Here,  find answers to common questions about orders, shipping and returns. If you need further assistance, feel free to <Link className="underline text-blue-600" href="/contact">contact us</Link>   .</p>
                </div>
                {/* Accordion */}
                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {isError && (
                            <div className="bg-background rounded-sm border border-red-500 mb-4 p-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-center text-red-500 flex-grow">Error feching FAQs</span>
                                </div>
                            </div>
                        )}
                        {isLoading && (
                            [...Array(5)].map((_, index) => (
                                <div key={index} className="bg-background rounded-sm border border-gray-200 mb-4 p-4">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-6 flex-grow" />
                                        <Skeleton className="h-5 w-5 ml-4" />
                                    </div>
                                </div>
                            ))
                        )}
                        {FAQs?.map((FAQ) => (
                            <AccordionItem
                                key={FAQ?._id}
                                value={FAQ?._id}
                                className="bg-background rounded-sm border border-gray-200 data-[state=open]:border-primary mb-4 py-4"
                            >
                                <AccordionTrigger
                                    className="px-6 py-4 text-lg font-medium text-title hover:no-underline flex justify-between items-center w-full rounded-sm transition-colors duration-200
                                    data-[state=open]:rounded-b-none"
                                >
                                    <span className="text-left flex-grow">{FAQ?.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 pt-0 text-subtitle">
                                    {FAQ?.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </PageLayout>
        </div>
    );
};

export default FAQ;