"use client";
import React, { useState } from "react";
import { useParams } from 'next/navigation';
import CustomBreadcrumb from "@/components/common/CustomBreadcrumb";
import PageLayout from "@/components/layout/PageLayout";
import SimilarProducts from "@/components/shop/details/SimilarProducts";
import { toast } from "sonner"
import ProductImageGallery from "@/components/shop/details/ProductImageGallery";
import ProductInfo from "@/components/shop/details/ProductInfo";
import ProductTabs from "@/components/shop/details/ProductTabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "@/api/product/getSIngleProduct";
import DetailsPageSkeleton from "@/components/shop/details/DetailsPageSkeleton";
import { addToCart } from "@/api/product/addToCart";
import api from "@/lib/api";

const DetailsPage = () => {
    const params = useParams();
    const { id: productId } = params;

    const { data, isLoading } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getSingleProduct(productId),
        enabled: !!productId,
    });

    const product = data?.product;
    const relatedProducts = data?.relatedProducts; 

    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    React.useEffect(() => {
        if (product) {
            setMainImage(product.images?.[0] || "");
            setSelectedSize(product.sizes?.[0]?.size || "");
            setSelectedColor(product.colors?.[0]?.name || "");
        }
    }, [product]);

    const breadcrumbLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: product?.name || "Product", isCurrent: true }, 
    ];

    const handleQuantityChange = (type) => {
        if (type === "increment") {
            setQuantity((prev) => prev + 1);
        } else if (type === "decrement" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const {mutate, isLoading: isAddToCartLoading} = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            toast.success("Product added to cart successfully.");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to add product to cart.");
        }
    })

    const handleAddToCart = (product, quantity, selectedColorName, selectedSizeValue) => {
        const body = {
            productId: product._id,
            quantity
        }

        if (selectedColorName) {
            const colorObject = product.colors?.find(color => color.name === selectedColorName);
            if (colorObject) {
                body.colorId = colorObject._id;
            }
        }

        if (selectedSizeValue) {
            const sizeObject = product.sizes?.find(size => size.size === selectedSizeValue);
            if (sizeObject) {
                body.sizeId = sizeObject._id;
            }
        }
        
        mutate(body)

    }

    const {data: reviewData} = useQuery({
        queryKey: ["review", productId],
        queryFn: ({ queryKey }) => {
            const [, productId] = queryKey;
            return api.get(`/review/get-user-product-reviews/${productId}`);
        },
        enabled: !!productId
    })


    if (isLoading) {
        return <DetailsPageSkeleton />;
    }

    return (
        <div className='min-h-minus-header'>
            <PageLayout>
                {/* Breadcrumb Section */}
                <div className="pb-4">
                    <CustomBreadcrumb links={breadcrumbLinks} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:items-start gap-8 pb-12">
                    <ProductImageGallery product={product} mainImage={mainImage} setMainImage={setMainImage} />
                    <ProductInfo
                        product={product}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                        quantity={quantity}
                        handleQuantityChange={handleQuantityChange}
                        handleAddToCart={handleAddToCart}
                        setSelectedSize={setSelectedSize}
                        setSelectedColor={setSelectedColor}
                        setMainImage={setMainImage}
                        isAddToCartLoading={isAddToCartLoading}
                    />
                </div>

                <ProductTabs product={product} reviewData={reviewData} />

                {/* Similar Products */}
                <SimilarProducts relatedProducts={relatedProducts}/>

            </PageLayout>
        </div>
    );
};

export default DetailsPage;