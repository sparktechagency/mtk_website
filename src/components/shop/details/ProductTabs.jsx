"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import StarRating from "./StarRating"
import moment from "moment"

const ProductTabs = ({ product, reviewData, currentPage, setCurrentPage, starFilter, setStarFilter }) => {

  const reviews = reviewData?.data?.data || []
  const totalReviews = reviewData?.data?.meta?.total || 0
  const totalPages = reviewData?.data?.meta?.totalPages || 1

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
              <StarRating rating={product?.ratings} totalStars={5} starClassName="size-5" />
            </div>
            <div className="text-gray-600 font-medium">Overall Rating</div>
          </div>

          <div className="flex justify-end mb-4">
            <Select value={starFilter} onValueChange={setStarFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by stars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {reviews.length > 0 ? (
            <div>
              <div className="text-gray-600 mb-4 font-medium">
                Showing {reviews.length} results
              </div>

              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
                          {review.fullName ? (
                            review.fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
                          ) : (
                            '?'
                          )}
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
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
