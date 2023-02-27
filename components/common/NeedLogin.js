import styled from "@emotion/styled";
import Router from "next/router";
import Popup from "components/common/atoms/Popup";
import { Caption1Bold } from "styles/typography";

export default (props) => {
  const { visible, setVisible } = props;
  console.log("needlogin ", Router.router.asPath);

  return (
    <Popup
      title={"로그인이 필요해요"}
      visible={visible}
      buttonType={"default"}
      cancelText={"돌아가기"}
      submitText={"로그인하기"}
      onCancelClick={() => {
        setVisible(false);
      }}
      onConfirmClick={() => {
        Router.push(`/login?redirect_uri=${Router.router.asPath}`);
      }}
    >
      <PopupSubTitle>
        로그인하고 실거주자가 들려주는
        <br />
        자취방 이야기를 들어보세요!
      </PopupSubTitle>
    </Popup>
  );
};

const PopupSubTitle = styled.div`
  ${Caption1Bold}
  text-align: center;
  color: var(--black);
`;
