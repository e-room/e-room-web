import ReviewList from "components/building/ReviewList";
import ImageView from "components/building/ImageList";

export default function ReviewSection({
  buildingImages,
  buildingReviews,
  profile,
  id,
  building,
  goReviewWrite,
}) {
  return (
    <>
      {buildingImages.reviewImageCount > 0 && (
        <ImageView data={buildingImages.reviewImageList} />
      )}
      {buildingReviews.reviewSlicedList.content.length > 0 ||
      buildingReviews.needToBlur ? (
        <ReviewList
          profile={profile}
          reviews={buildingReviews.reviewSlicedList.content}
          buildingId={id}
          needToBlur={buildingReviews.needToBlur}
        />
      ) : (
        <NoReview building={building} goReviewWrite={goReviewWrite} />
      )}
    </>
  );
}
