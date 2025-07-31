"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import StarRating from "./StarRating"
import moment from "moment"

const ProductTabs = ({ product, reviewData }) => {
  const [visibleReviews, setVisibleReviews] = useState(3)

  const handleShowMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3)
  }

  const reviews = reviewData?.data?.data || []
  const totalReviews = reviewData?.data?.meta?.total || 0

  return (
    <div className="w-full">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-10 gap-8 h-auto p-2 bg-content">
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
            Reviews ({totalReviews})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: product?.description || "" }}
          />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          {/* Overall Rating Section */}
          <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-2">{product?.ratings}</div>
            <div className="flex justify-center items-center gap-1 mb-2">
              <StarRating rating={product.ratings} totalStars={5} starClassName="size-5" />
            </div>
            <div className="text-gray-600 font-medium">Overall Rating</div>
          </div>

          {reviews.length > 0 ? (
            <div>
              <div className="text-gray-600 mb-4 font-medium">
                Showing {Math.min(visibleReviews, reviews.length)} results
              </div>

              <div className="space-y-6">
                {reviews.slice(0, visibleReviews).map((review) => (
                  <div key={review._id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src="/images/avatar (1).png" alt={review.fullName} />
                        <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
                          {review.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">{review.fullName}</h4>
                            <p className="text-sm text-gray-500">
                              {moment(review.createdAt).format("DD MMMM YYYY")}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <StarRating starClassName="size-4" rating={review.star} />
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleReviews < reviews.length && (
                <div className="flex justify-start mt-6">
                  <Button
                    variant="ghost"
                    onClick={handleShowMoreReviews}
                    className="text-gray-700 hover:text-gray-900 p-0 h-auto font-medium"
                  >
                    Show More Reviews <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">No reviews yet. Be the first to review this product!</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProductTabs
