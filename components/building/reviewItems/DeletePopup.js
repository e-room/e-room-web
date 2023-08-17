import Popup from "components/common/atoms/Popup";
import { removeReviewByReviewId } from "services/building.service";

export default (props) => {
  const { reviewId, showConfirmDelete, setShowConfirmDelete, state, setState } =
    props;
  const onDelete = async () => {
    await removeReviewByReviewId(reviewId).then((res) => {
      setShowConfirmDelete(false);
      const filters = state.item.filter(
        (v) => v.reviewBaseDto.reviewId !== reviewId
      );
      setState({
        ...state,
        item: [...filters],
      });
    });
  };

  return (
    <Popup
      title={"정말로 이 리뷰를 삭제하시겠어요?"}
      visible={showConfirmDelete}
      buttonType={"warning"}
      cancelText={"취소"}
      submitText={"삭제"}
      onCancelClick={() => {
        document.body.style.overflow = "unset";
        setShowConfirmDelete(false);
      }}
      onConfirmClick={() => onDelete()}
    >
      <div className="text-caption-bold-1 text-center">
        삭제하면 되돌릴 수 없습니다.
        <br />
        신중하게 결정해주세요.
      </div>
    </Popup>
  );
};
