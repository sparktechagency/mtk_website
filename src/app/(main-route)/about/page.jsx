'use client';
import SimpleHero from "@/components/common/SimpleHero";
import PageLayout from "@/components/layout/PageLayout";
import { useGetPolicy } from "@/hooks/useGetPolicy";
import PolicySkeleton from "@/components/common/PolicySkeleton";

const heroLinks = [
    { name: "Home", href: "/" },
    { name: "About", isCurrent: true }
];

const Aboutpage = () => {
    const { policy: about, isLoading, isError } = useGetPolicy("about-us");
    const cleanHtml = (html) => {
        if (!html) return "";
        return html.replace(/style="([^"]*)"/g, '');
    };

    return (
        <div className='min-h-minus-header'>
            <SimpleHero title="About Us" links={heroLinks} />

            <PageLayout>
                {isLoading && <PolicySkeleton />}
                {isError &&
                    <div className="flex justify-center bg-background rounded-sm border border-red-500 mb-4 p-4">
                        <span className="text-red-500">Error feching about us</span>
                    </div>
                }
                {!isLoading && !isError && <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: cleanHtml(about?.content) }} />}
            </PageLayout>
        </div>
    );
};

export default Aboutpage;
