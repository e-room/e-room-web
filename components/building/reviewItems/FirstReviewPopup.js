import styled from "@emotion/styled";
import Popup from "components/common/atoms/Popup";
import { useRouter } from "next/router";
import { Caption1Bold } from "styles/typography";
import Illust from "assets/illust/illust-male_evaluation.svg";

export default (props) => {
  const { buildingId, onClose, visible } = props;
  const router = useRouter();

  const goLogin = () => {
    router.push(`/login?redirect_uri=/building/${buildingId}`);
  };

  return (
    <Popup
      title={
        <div>
          리뷰 하나만 쓰고
          <br />
          모든 실거주자의 리뷰를 확인하세요!
        </div>
      }
      visible={visible}
      buttonType={"default"}
      cancelText={"다음에 쓸게요"}
      submitText={"쓰고 볼게요"}
      onCancelClick={onClose}
      onConfirmClick={goLogin}
    >
      <Illust />
      <PopupSubTitle>
        실제 살았던 방이라면, 어떤 방이든지
        <br />
        1분 안에 간단히 쓸 수 있어요!
      </PopupSubTitle>
    </Popup>
  );
};

const PopupSubTitle = styled.div`
  ${Caption1Bold}
  text-align: center;
`;
