import { Skeleton } from "@/components/ui/skeleton";
import PageLayout from "@/components/layout/PageLayout";

const DetailsPageSkeleton = () => {
    return (
        <div className='min-h-minus-header'> 
            <PageLayout>
                {/* Breadcrumb Skeleton */}
                <div className="pb-4">
                    <Skeleton className="h-4 w-1/3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-8 pb-12">
                    {/* Image Gallery Skeleton */}
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-[500px] w-full rounded-lg" />
                        <div className="flex gap-2">
                            <Skeleton className="h-24 w-24 rounded-lg" />
                            <Skeleton className="h-24 w-24 rounded-lg" />
                            <Skeleton className="h-24 w-24 rounded-lg" />
                            <Skeleton className="h-24 w-24 rounded-lg" />
                        </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div className="space-y-6">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-8 w-3/4" />
                        <div className="flex items-center gap-3 mt-1">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-5 w-28" />
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                        <Skeleton className="h-px w-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                        <Skeleton className="h-px w-full" />
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-16" />
                            <div className="flex gap-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-12" />
                            <div className="flex gap-2">
                                <Skeleton className="h-10 w-16" />
                                <Skeleton className="h-10 w-16" />
                                <Skeleton className="h-10 w-16" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <Skeleton className="h-12 w-32" />
                            <Skeleton className="h-12 flex-1" />
                            <Skeleton className="h-12 w-12" />
                        </div>
                    </div>
                </div>

                {/* Tabs Skeleton */}
                <div className="w-full">
                    <div className="flex gap-20 pb-2 border-b-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-10/11" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                        <Skeleton className="h-4 w-4/7" />
                    </div>
                </div>

                {/* Similar Products Skeleton */}
                <div className="mt-12">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default DetailsPageSkeleton;
