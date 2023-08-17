import { useEffect, useState } from "react";

import accessValid from "utils/accessValid";

import DeletePopup from "./reviewItems/DeletePopup";
import DetailScorePopup from "./reviewItems/DetailScorePopup";
import ReviewInfo from "./reviewItems/ReviewInfo";
import LikeField from "./reviewItems/LikeField";
import AuthorInfo from "./reviewItems/AuthorInfo";
import ImageField from "./reviewItems/ImageField";
import Slider from "./Slider";
import { getBuildingReviewById } from "services/building.service";

export default function ReviewList(props) {
  const { reviews, buildingId, needToBlur = true, profile } = props;

  const data = reviews;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showImages, setShowImages] = useState({
    visible: false,
    uuid: null,
    data: [],
    authorName: "",
  });

  const onCloseImg = () => {
    setShowImages({ visible: false, uuid: null, data: [], authorName: "" });
  };
  const onDetailView = (id, data, authorName) => {
    setShowImages({
      visible: true,
      uuid: id,
      data: data,
      authorName: authorName,
    });
  };

  const [defaultValue, setDefaultValue] = useState({});
  const [showTotalScore, setShowTotalScore] = useState(false);

  const onScorePopup = (value) => {
    setDefaultValue(value);
    setShowTotalScore(true);
  };

  const onDeletePopup = async (value) => {
    const valid = await accessValid({
      redirect_uri: `/building/${buildingId}`,
    });
    setDefaultValue(value);
    if (valid) {
      setShowConfirmDelete(true);
    }
  };

  const [target, setTarget] = useState(null);
  const [state, setState] = useState({
    item: data,
    isLoading: false,
  });
  const lastData = data[data.length - 1];
  let cursorId = lastData?.reviewBaseDto?.reviewId ?? null;

  const fetchItems = async () => {
    if (!cursorId) return;

    const response = await getBuildingReviewById(buildingId, {
      size: 4,
      sort: "id,DESC",
      cursorIds: cursorId,
    });

    const responseContent = response.data.reviewSlicedList.content;
    const nextItem = needToBlur ? null : responseContent;
    const lastItem = responseContent[responseContent.length - 1];

    cursorId = lastItem ? lastItem.reviewBaseDto.reviewId : null;

    if (!nextItem || nextItem?.length < 1) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    setState((prev) => ({
      item: [...prev.item, ...nextItem],
      isLoading: false,
    }));
  };
  useEffect(() => {
    let observer;
    if (target && cursorId) {
      observer = new IntersectionObserver(
        async ([entry], observer) => {
          if (entry.isIntersecting && cursorId) {
            observer.unobserve(entry.target);
            await fetchItems();
            observer.observe(entry.target);
          }
        },
        { threshold: 1 }
      );
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, cursorId]);

  const { item, isLoading } = state;

  return (
    <div className="pt-[12px] pr-[20px] pb-[170px] pl-[20px] bg-body">
      <div className="text-body-bold-1 text-black mb-[12px]">
        실제 거주 후기
      </div>
      <div>
        {showImages.visible && (
          <Slider
            data={showImages.data}
            onClose={onCloseImg}
            defaultId={showImages.uuid}
            authorName={showImages.authorName}
          />
        )}
        {showConfirmDelete && (
          <DeletePopup
            state={state}
            setState={setState}
            reviewId={defaultValue.reviewBaseDto.reviewId}
            showConfirmDelete={showConfirmDelete}
            setShowConfirmDelete={setShowConfirmDelete}
          />
        )}
        {showTotalScore && (
          <DetailScorePopup
            value={defaultValue}
            showTotalScore={showTotalScore}
            setShowTotalScore={setShowTotalScore}
          />
        )}

        {item.map((value, index) => {
          if (needToBlur && index > 1) return;

          return (
            <div
              className="flex flex-col gap-[20px] bg-white rounded-[8px] p-[16px] mb-[12px]"
              key={value.reviewBaseDto.reviewId}
            >
              <AuthorInfo
                value={value}
                onScorePopup={onScorePopup}
                onDeletePopup={onDeletePopup}
                profile={profile}
              />
              <ReviewInfo value={value} />
              {value.reviewImageListDto.reviewImageList && (
                <ImageField
                  images={value.reviewImageListDto.reviewImageList}
                  authorName={value.authorDto.name ?? ""}
                  onDetailView={onDetailView}
                />
              )}
              <LikeField value={value} buildingId={buildingId} />
            </div>
          );
        })}
        {needToBlur && <PleaseLogin />}
        <div ref={setTarget}>{isLoading && "Loading..."}</div>
      </div>
    </div>
  );
}
