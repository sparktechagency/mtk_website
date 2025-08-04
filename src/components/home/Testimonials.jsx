"use client";

import ContentHeader from '../common/ContentHeader';
import PageLayout from '../layout/PageLayout';
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import StarRating from '../shop/details/StarRating';


import moment from 'moment';

const Testimonials = () => {
    const [carouselApi, setCarouselApi] = useState(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!carouselApi) {
            return;
        }

        setCurrent(carouselApi.selectedScrollSnap());

        const handleSelect = () => {
            setCurrent(carouselApi.selectedScrollSnap());
        };

        carouselApi.on("select", handleSelect);

        return () => {
            carouselApi.off("select", handleSelect);
        };
    }, [carouselApi]);


    const { data } = useQuery({
        queryKey: ["testimonials"],
        queryFn: () => api.get("/review/get-testimonials"),
    })

    const testimonials = data?.data?.data || [];

    return (
        <div className='bg-content-bg'>
            <PageLayout>
                <ContentHeader
                    title="Listening to Our Customers"
                    subtitle="Discover how collectors like you rate our service, quality, and shipping experience."
                />

                <Carousel
                    setApi={setCarouselApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, idx) => (
                            <CarouselItem key={idx} className="md:basis-1/2">
                                <div className='bg-background p-6 md:p-8 rounded-3xl relative space-y-6 h-full'>
                                    <div className='md:grid grid-cols-5'>
                                        <Image
                                            src="/images/quotation.png"
                                            alt="Quote Icon"
                                            width={60}
                                            height={60}
                                        />
                                        <div className='col-span-4'>
                                            <p className="text-subtitle text-sm sm:text-lg leading-relaxed">
                                                {testimonial.comment}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='md:flex space-y-3 justify-between items-end'>
                                            <div className='flex gap-3 md:gap-4 items-center'>
                                                <Avatar className="h-16 w-16 flex-shrink-0">
                                                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xl font-medium">
                                                        {testimonial.fullName ? (
                                                            testimonial.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
                                                        ) : (
                                                            '?'
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-title font-semibold text-base sm:text-lg mb-1">
                                                        {testimonial.fullName}
                                                    </p>
                                                    <p className="text-subtitle text-sm">
                                                        {moment(testimonial.createdAt).fromNow()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <StarRating rating={testimonial.star} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => carouselApi?.scrollTo(i)}
                            className={`w-6 h-4 rounded-full ${i === current ? 'bg-primary' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            </PageLayout>
        </div>
    );
};

export default Testimonials;