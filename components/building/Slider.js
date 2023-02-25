import styled from "@emotion/styled";
import Avatar from "components/common/atoms/Avatar";
import Icon from "components/common/atoms/Icon";
import avatarImg from "assets/avatar/24.png";
import { Body2 } from "styles/typography";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { fadeIn_Down0 } from "styles/keyframes";

export default function Slider({ data, onClose, defaultId, authorName = "" }) {
  const index = data.findIndex((item) => item.uuid === defaultId);
  const [visible, setVisible] = useState(false);

  // TODO : touch cancel 안됨...
  useEffect(() => {
    if (visible) {
      setTimeout(() => setVisible(false), 3000);
    }
  }, [visible]);

  return (
    <Overlay>
      <Container
        onClick={() => {
          setVisible(true);
        }}
        onTouchStart={() => {
          setVisible(true);
        }}
        onTouchMove={() => {
          setVisible(true);
        }}
        onTouchEnd={(e) => {
          setVisible(true);
        }}
      >
        <Carousel
          showStatus={true}
          selectedItem={index ?? 0}
          showIndicators={false}
          autoFocus={true}
          showThumbs={false}
          infiniteLoop={true}
          swipeable={true}
          emulateTouch={true}
          statusFormatter={(e) => {
            return (
              <Top>
                <CountField>
                  {e}/{data.length}
                </CountField>
                <XField onClick={onClose} className="cursor-pointer">
                  <Icon icon={"x-icon"} size={"md"} fill={"var(--white)"} />
                </XField>
              </Top>
            );
          }}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <ArrowButton
                visible={visible}
                style={{ left: 4 }}
                onClick={onClickHandler}
              >
                <Icon icon={"arrow-left"} size={"md"} fill={"var(--white)"} />
              </ArrowButton>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <ArrowButton
                visible={visible}
                style={{ right: 4 }}
                onClick={onClickHandler}
              >
                <Icon icon={"arrow-right"} size={"md"} fill={"var(--white)"} />
              </ArrowButton>
            )
          }
        >
          {data.map((value) => {
            return (
              <>
                <ImageField key={value.uuid}>
                  <img src={value.url} style={{ objectFit: "contain" }} />
                </ImageField>
                <Profile>
                  <Avatar
                    size={"md"}
                    img={avatarImg.src}
                    style={{ marginRight: 6 }}
                  />
                  {value?.anonymousStatus?.anonymousName ?? authorName}
                </Profile>
              </>
            );
          })}
        </Carousel>
      </Container>
    </Overlay>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const CountField = styled.div`
  ${Body2}
  color: var(--white);
`;
const XField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--black);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  overflow: hidden !important;
  touch-action: none;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  color: var(--white);
  position: fixed;
  bottom: 30px;
  width: 100%;
  justify-content: center;
`;

const ArrowButton = styled.div`
  background: rgba(33, 33, 33, 0.16);
  border-radius: 100%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  position: absolute;
  top: calc((50% - 30px));
  cursor: pointer;

  ${(p) => fadeIn_Down0(p.visible)}
`;

const ImageField = styled.div`
  /* height: 80vh; */
  padding-top: 44px;
  /* height: 100vh; */
  height: calc(100vh - 44px);
  display: flex;
  align-items: center;
  overflow: hidden;
  max-width: 720px;
  margin: 0 auto;
`;
