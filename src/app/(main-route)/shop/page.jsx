"use client";
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import MobileFilter from "@/components/shop/MobileFilter";
import DesktopFilter from "@/components/shop/DesktopFilter";
import ShopCard from "@/components/shop/ShopCard";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";



const ShopPage = () => {

    // State for price range inputs and slider
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [debouncedPriceRange, setDebouncedPriceRange] = useState([0, 2500]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedPriceRange(priceRange);
        }, 600);

        return () => {
            clearTimeout(handler);
        };
    }, [priceRange]);
    // State for selected rating
    const [selectedRating, setSelectedRating] = useState(0);
    // State for categories
    const [categories, setCategories] = useState([]);
    // State for selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);
    // State for selected availability
    const [selectedAvailability, setSelectedAvailability] = useState("all");
    // State for search
    const [searchTerm, setSearchTerm] = useState("");
    // State for debounced search
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);

    // Handle category change
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
        );
    };

    // Handle availability change
    const handleAvailabilityChange = (value) => {
        setSelectedAvailability(value);
    };

    // Handle input change for min price
    const handleMinPriceChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            setPriceRange([value, priceRange[1]]);
        }
    };

    // Handle input change for max price
    const handleMaxPriceChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            setPriceRange([priceRange[0], value]);
        }
    };

    // Handle slider change
    const handleSliderChange = (newValues) => {
        setPriceRange(newValues);
    };

    // Handle rating click
    const handleRatingClick = (starNum) => {
        if (selectedRating === starNum) {
            setSelectedRating(0);
        } else {
            setSelectedRating(starNum);
        }
    };

    const handleWishlistClick = (e, productId) => {
        e.stopPropagation();
        // Add your wishlist logic here
        toast.success(`Product ${productId} added to wishlist`);
    };

    // Fetch category
    const { data: categoryResponse, isLoading: categoryLoading } = useQuery({
        queryKey: ["category"],
        queryFn: () => api.get("/category/get-category-drop-down")
    })


    const { data: productResponse, isLoading: productLoading } = useQuery({
        queryKey: ["products", debouncedSearchTerm, page, limit, selectedCategories, selectedAvailability, debouncedPriceRange, selectedRating],
        queryFn: async () => {
            const params = new URLSearchParams();

            if (debouncedSearchTerm) {
                params.append("searchTerm", debouncedSearchTerm);
            }
            params.append("page", page);
            params.append("limit", limit);

            if (selectedCategories.length > 0) {
                selectedCategories.forEach(id => params.append("categoryId", id));
            }

            if (selectedAvailability !== "all") {
                params.append("stockStatus", selectedAvailability);
            }

            params.append("fromPrice", debouncedPriceRange[0]);
            params.append("toPrice", debouncedPriceRange[1]);

            if (selectedRating > 0) {
                params.append("ratings", selectedRating);
            }
            
            // console.log("Fetching products with params:", params.toString());
            const response = await api.get(`/product/get-user-products?${params.toString()}`);
            return response.data;
        }
    });

    const products = productResponse?.data || [];
    const totalProducts = productResponse?.meta?.total || 0;

    useEffect(() => {
        if (categoryResponse?.data?.data) {
            setCategories(categoryResponse.data.data);
        }
    }, [categoryResponse]);


    const breadcrumbLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", isCurrent: true }
    ];

    return (
        <div className="min-h-minus-header">
            <PageLayout>
                <div className="flex justify-between items-center pb-4">
                    <CustomBreadcrumb links={breadcrumbLinks} />
                    {/* for mobile */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Filter Trigger */}
                        <MobileFilter {...{categories,categoryLoading, priceRange, selectedRating, handleRatingClick, handleSliderChange, handleMaxPriceChange, handleMinPriceChange, selectedCategories, selectedAvailability, handleCategoryChange, handleAvailabilityChange }} />

                        {/* Desktop Search */}
                        <div className="relative hidden md:block">
                            <Input type="text" placeholder="Search" className="pl-10 w-full md:w-80" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <Search size={20} className="text-primary absolute left-2 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Mobile Search */}
                        <div className="md:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Search size={20} className="text-primary cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-screen p-2">
                                    <div className="relative">
                                        <Input type="text" placeholder="Search" className="pl-10 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                        <Search size={20} className="text-primary absolute left-2 top-1/2 -translate-y-1/2" />
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-7 gap-6 min-h-screen mt-4">
                    {/* Desktop Filter Column (md:col-span-2) */}
                    <DesktopFilter {...{categories,categoryLoading, priceRange, selectedRating, handleRatingClick, handleSliderChange, handleMaxPriceChange, handleMinPriceChange, selectedCategories, selectedAvailability, handleCategoryChange, handleAvailabilityChange }} />

                    {/* Right Content Column (md:col-span-5) */}
                    <div className="md:col-span-5">
                        <div className="text-subtitle mb-4">
                            Showing {totalProducts} results
                        </div>
                        {productLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {Array.from({ length: limit }).map((_, index) => (
                                    <div key={index} className="border rounded-md p-4">
                                        <Skeleton className="h-48 w-full mb-4" />
                                        <Skeleton className="h-4 w-3/4 mb-2" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ShopCard key={product._id} product={product} handleWishlistClick={handleWishlistClick} />
                                ))}
                            </div>
                        )}
                        {totalProducts > limit && (
                            <div className="mt-8">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" onClick={() => setPage(prev => Math.max(1, prev - 1))} />
                                        </PaginationItem>
                                        {Array.from({ length: Math.ceil(totalProducts / limit) }).map((_, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink href="#" isActive={page === index + 1} onClick={() => setPage(index + 1)}>
                                                    {index + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <PaginationNext href="#" onClick={() => setPage(prev => Math.min(Math.ceil(totalProducts / limit), prev + 1))} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </div>
                </div>

            </PageLayout>
        </div>
    );
};

export default ShopPage;