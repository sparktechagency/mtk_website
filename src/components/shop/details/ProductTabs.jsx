'use client'
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import StarRating from "@/components/shop/details/StarRating";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const ProductTabs = ({ product }) => {
    const [visibleReviews, setVisibleReviews] = useState(3);

    const handleShowMoreReviews = () => {
        setVisibleReviews((prev) => prev + 3);
    };

    return (
        <div>
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-8 h-auto p-2 bg-content">
                    <TabsTrigger
                        value="description"
                        className="border-0 data-[state=active]:border-b-2 data-[state=active]:border-b-primary dark:data-[state=active]:border-b-primary rounded-none"
                    >
                        Description
                    </TabsTrigger>
                    <TabsTrigger
                        value="reviews"
                        className="border-0 data-[state=active]:border-b-2 data-[state=active]:border-b-primary dark:data-[state=active]:border-b-primary rounded-none"
                    >
                        Reviews (0)
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="description"
                    className="mt-4 rounded-lg"
                >
                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: product?.description || "" }}
                    />
                </TabsContent>
                <TabsContent
                    value="reviews"
                    className="mt-4 rounded-lg"
                >
                    {/* Reviews will be added later */}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProductTabs;

