"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "../ui/skeleton";

const DesktopFilter = ({ categories, categoryLoading, priceRange, selectedRating, handleRatingClick, handleSliderChange, handleMaxPriceChange, handleMinPriceChange, selectedCategories, selectedAvailability, handleCategoryChange, handleAvailabilityChange }) => {

    return (
        <>
            <div className="hidden md:block md:col-span-2 sticky top-24 h-fit">
                <h3 className="text-xl font-medium mb-4 text-title">Filter By</h3>

                <div className="bg-content-bg rounded-lg p-4">
                    {/* Category Filter */}
                    <Accordion type="single" collapsible defaultValue="category">
                        <AccordionItem value="category" className="border-b border-gray-200">
                            <AccordionTrigger className="text-lg font-medium text-title hover:no-underline">Category</AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 space-y-3">
                                {categoryLoading ? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <Skeleton className="h-4 w-4" />
                                            <Skeleton className="h-4 w-1/3" />
                                        </div>
                                    ))
                                ) : (
                                    categories.map((category) => (
                                        <div key={category._id} className="flex items-center space-x-2">
                                            <Checkbox id={category._id} onCheckedChange={() => handleCategoryChange(category._id)} checked={selectedCategories.includes(category._id)} />
                                            <label htmlFor={category._id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-subtitle">
                                                {category.name}
                                            </label>
                                        </div>
                                    ))
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Availability Filter */}
                    <Accordion type="single" collapsible defaultValue="availability">
                        <AccordionItem value="availability" className="border-b border-gray-200">
                            <AccordionTrigger className="text-lg font-medium text-title hover:no-underline">Availability</AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 space-y-3">
                                <RadioGroup defaultValue="all" onValueChange={handleAvailabilityChange} value={selectedAvailability}>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="all" id="r4" />
                                        <Label htmlFor="r4" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-subtitle">All</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="in_stock" id="r1" />
                                        <Label htmlFor="r1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-subtitle">In Stock</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="stock_out" id="r2" />
                                        <Label htmlFor="r2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-subtitle">Out of Stock</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="limited_stock" id="r3" />
                                        <Label htmlFor="r3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-subtitle">Limited Stock</Label>
                                    </div>
                                </RadioGroup>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Price Range Filter */}
                    <Accordion type="single" collapsible defaultValue="price-range">
                        <AccordionItem value="price-range" className="border-b border-gray-200">
                            <AccordionTrigger className="text-lg font-medium text-title hover:no-underline">Price Range</AccordionTrigger>
                            <AccordionContent className="pt-2 pb-4 space-y-4">
                                {/* Price Slider */}
                                <Slider
                                    value={priceRange}
                                    onValueChange={handleSliderChange}
                                    max={5000}
                                    step={10}
                                    minStepsBetweenThumbs={1}
                                    className="w-full [&>span:first-child]:bg-primary/20"
                                />
                                <div className="flex justify-between gap-4">
                                    <Input
                                        type="number"
                                        placeholder="Min Price"
                                        value={priceRange[0]}
                                        onChange={handleMinPriceChange}
                                        className="w-1/2 text-center"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max Price"
                                        value={priceRange[1]}
                                        onChange={handleMaxPriceChange}
                                        className="w-1/2 text-center"
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Rating Filter */}
                    <div className="py-4">
                        <h4 className="text-lg font-medium text-title mb-3">Rating</h4>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((starNum) => (
                                <Star
                                    key={starNum}
                                    className={`h-4 w-4 cursor-pointer ${starNum <= selectedRating ? 'text-yellow-400 fill-yellow-400' : 'text-subtitle'}`}
                                    onClick={() => handleRatingClick(starNum)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default DesktopFilter;