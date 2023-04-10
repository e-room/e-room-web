import styled from "@emotion/styled";
import Router from "next/router";
import Popup from "components/common/atoms/Popup";
import { Caption1Bold } from "styles/typography";
import logEvent from "amplitude/logEvent";

export default (props) => {
  const { visible, setVisible, useBack = false } = props;

  logEvent({ name: "view-login_popup" });
  return (
    <Popup
      title={"로그인이 필요해요"}
      visible={visible}
      buttonType={"default"}
      cancelText={"돌아가기"}
      submitText={"로그인하기"}
      onCancelClick={() => {
        logEvent({ name: "click-login_popup-deny" });
        setVisible(false);
        if (useBack) Router.back();
      }}
      onConfirmClick={() => {
        logEvent({ name: "click-login_popup-login" });
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
