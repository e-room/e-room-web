import styled from "@emotion/styled";
import axios from "axios";
import Popup from "components/common/atoms/Popup";
import { Caption1Bold } from "styles/typography";

export default ({ reviewId, showConfirmDelete, setShowConfirmDelete }) => {
  const onDelete = async () => {
    await axios
      .delete(`/apis/building/room/review/${reviewId}`)
      .then((res) => setShowConfirmDelete(false))
      .catch((err) => console.log("리뷰 삭제가 실패했습니다.", err));
  };

  return (
    <Popup
      title={"정말로 이 리뷰를 삭제하시겠어요?"}
      visible={showConfirmDelete}
      buttonType={"warning"}
      cancelText={"취소"}
      submitText={"삭제"}
      onCancelClick={() => setShowConfirmDelete(false)}
      onConfirmClick={() => onDelete()}
    >
      <PopupSubTitle>
        삭제하면 되돌릴 수 없습니다.
        <br />
        신중하게 결정해주세요.
      </PopupSubTitle>
    </Popup>
  );
};

const PopupSubTitle = styled.div`
  ${Caption1Bold}
  text-align: center;
`;
