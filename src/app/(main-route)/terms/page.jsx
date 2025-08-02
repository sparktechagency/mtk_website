"use client";

import PolicySkeleton from "@/components/common/PolicySkeleton";
import SimpleHero from "@/components/common/SimpleHero";
import PageLayout from "@/components/layout/PageLayout";
import { useGetPolicy } from "@/hooks/useGetPolicy";

const heroLinks = [
    { name: "Home", href: "/" },
    { name: "Terms", isCurrent: true }
];

const TermsPage = () => {

    const { policy: about, isLoading, isError } = useGetPolicy("terms-condition");
    const cleanHtml = (html) => {
        if (!html) return "";
        return html.replace(/style="([^"]*)"/g, '');
    };

    return (
        <div className='min-h-minus-header'>
            <SimpleHero title="Terms & Conditions" links={heroLinks} />

            <PageLayout>
                {isLoading && <PolicySkeleton />}
                {isError &&
                    <div className="flex justify-center bg-background rounded-sm border border-red-500 mb-4 p-4">
                        <span className="text-red-500">Error feching terms & condition</span>
                    </div>
                }
                {!isLoading && !isError && <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: cleanHtml(about?.content) }} />}
            </PageLayout>
        </div>
    );
};

export default TermsPage;