"use client"
import ContentHeader from "../common/ContentHeader";
import PageLayout from "../layout/PageLayout";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetFaq } from "@/hooks/useGetFaq";
import { Skeleton } from "../ui/skeleton";


const Faq = () => {

    const { FAQs, isLoading, isError } = useGetFaq();

    return (
        <div>
            <PageLayout>
                <ContentHeader title="FAQs" subtitle="Got questions? We’ve got answers — here to help you shop with confidence." />

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

export default Faq;