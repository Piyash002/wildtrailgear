/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGetProductDteailsQuery, useSubmitReviewMutation } from '../../redux/features/product/productAPi/productApi';

const ProductReviews = ({ productId }: any) => {
  const { data: product, isLoading, refetch } = useGetProductDteailsQuery(productId);
  const reviews = product?.data?.reviews?? []
  const [submitReview, { isLoading: submitting }] = useSubmitReviewMutation();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();

    if (!comment.trim()) {
      setMessage('❌ Please enter a comment');
      return;
    }

    try {
      await submitReview({ productId, reviewData: { rating, comment } }).unwrap();
      setRating(5);
      setComment('');
      setMessage('✅ Review submitted!');
      refetch(); // reload updated reviews
    } catch (err) {
      setMessage(
        (err as { data?: { message?: string } })?.data?.message || '❌ Failed to submit review'
      );
    }
  };

  // ⭐ Generate star emojis
  const renderStars = (num: number) => '⭐'.repeat(num) + '☆'.repeat(5 - num);

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-8">
      {/* === Review List === */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : reviews?.length > 0 ? (
        reviews.map((review: any) => (
          <div key={review._id} className="border p-4 rounded mb-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-yellow-500 text-xl">{renderStars(review.rating)}</span>
              <small className="text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
            <p className="mt-2 text-gray-800">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      {/* === Submit Review Form === */}
      <form
        onSubmit={handleReviewSubmit}
        className="bg-white border p-6 rounded shadow space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-800">Leave a Review</h3>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {renderStars(n)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Write your review here..."
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>

        {message && (
          <p className={`mt-2 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ProductReviews;
