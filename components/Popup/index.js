import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Score from "../Input/Score";
import Button from "../Button/Button";
import Icon from "../Icon";
import { useState } from "react";
import { Caption1Bold, SubTitle1 } from "../../styles/typography";

export default function Popup({ title, subTitle, visible = false, onHideClick }) {
  return (
    <Overlay>
      <Container>
        <XField>
          <div onClick={onHideClick}>
            <Icon icon={"x-icon"} size={"md"} fill={`var(--white)`} />
          </div>
        </XField>
        <StyledPopup visible={visible}>
          <Title>{title}</Title>
          <div>
            <Score size={"xl"} />
          </div>
          <SubTitle>{subTitle}</SubTitle>
          <ButtonGroup>
            <Button label={"Label"} size="md" width={"100%"} />
          </ButtonGroup>
        </StyledPopup>
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10;

  background: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  bottom: 0;
  position: fixed;
`;

const XField = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 8px;
  margin-right: 20px;
`;

const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px 20px;
  gap: 16px;
  isolation: isolate;

  background: var(--white);
  border-radius: 32px 32px 0px 0px;
`;

const Title = styled.div`
  ${SubTitle1}

  color: var(--black);

  padding: 0 65px;
  text-align: center;
`;

const SubTitle = styled.div`
  ${Caption1Bold}

  text-align: center;

  color: var(--black);
`;

const ButtonGroup = styled.div`
  width: 100%;
`;
