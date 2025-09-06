"use client";

import PolicySkeleton from "@/components/common/PolicySkeleton";
import SimpleHero from "@/components/common/SimpleHero";
import PageLayout from "@/components/layout/PageLayout";
import { useGetPolicy } from "@/hooks/useGetPolicy";
import { replaceWhiteBackground } from "@/lib/utils";

const heroLinks = [
    { name: "Home", href: "/" },
    { name: "Privacy Policy", isCurrent: true }
];

const PrivacyPage = () => {

    const { policy: about, isLoading, isError } = useGetPolicy("privacy-policy");

    return (
        <div className='min-h-minus-header'>
            <SimpleHero title="Privacy Policy" links={heroLinks} />

            <PageLayout>
                {isLoading && <PolicySkeleton />}
                {isError &&
                    <div className="flex justify-center bg-background rounded-sm border border-red-500 mb-4 p-4">
                        <span className="text-red-500">Error feching privacy-policy</span>
                    </div>
                }
                {!isLoading && !isError && <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: replaceWhiteBackground(about?.content) }} />}
            </PageLayout>
        </div>
    );
};

export default PrivacyPage;