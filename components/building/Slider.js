import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Avatar from "components/common/atoms/Avatar";
import Icon from "components/common/atoms/Icon";
import avatarImg from "assets/avatar/24.png";

export default function Slider({ data, onClose }) {
  const ref = useRef(null);
  const [imageList] = useState([data[data?.length - 1], ...data, data[0]]);
  const [currentImgIndex, setCurrentImgIndex] = useState(1);

  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });
  const nextSlide = () => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };
  const prevSlide = () => {
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle({
      transform: `translateX(-${currentImgIndex - 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };
  useEffect(() => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(imageList.length - 2);
      setTimeout(function () {
        setStyle({
          transform: `translateX(-${imageList.length - 2}00%)`,
          transition: "0ms",
        });
      }, 500);
    }
    if (currentImgIndex >= imageList?.length - 1) {
      setCurrentImgIndex(1);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${1}00%)`,
          transition: "0ms",
        });
      }, 500);
    }
  }, [currentImgIndex, imageList.length]);

  return (
    <Overlay>
      <div
        onTouchStart={(e) => {
          setTouch({
            ...touch,
            start: e.touches[0].pageX,
          });
        }}
        onTouchMove={(e) => {
          if (ref?.current) {
            const current = ref.current.clientWidth * currentImgIndex;
            const result = -current + (e.targetTouches[0].pageX - touch.start);
            setStyle({
              transform: `translate3d(${result}px, 0px, 0px)`,
              transition: "0ms",
            });
          }
        }}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0].pageX;
          if (touch.start > end) {
            nextSlide();
          } else {
            prevSlide();
          }
          setTouch({
            ...touch,
            end,
          });
        }}
      >
        <Top>
          <CountField>
            {currentImgIndex}/{data.length}
          </CountField>
          <XField onClick={onClose}>
            <Icon icon={"x-icon"} size={"lg"} fill={"var(--white)"} />
          </XField>
        </Top>
        <div
          ref={ref}
          style={{ ...style, display: "flex", height: `calc(100vh - 150px)` }}
        >
          {imageList?.map((el, i) => {
            return (
              <img
                key={i}
                src={el.url}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            );
          })}
        </div>
      </div>
      <Profile>
        <Avatar size={"md"} img={avatarImg.src} style={{ marginRight: 6 }} />
        새침한 판다
      </Profile>
    </Overlay>
  );
}

const Profile = styled.div`
  display: flex;
  align-items: center;
  color: var(--white);
  position: fixed;
  bottom: 30px;
  width: 100%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
`;

const CountField = styled.div`
  color: var(--white);

  // TODO: font 맞추기
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
`;
const XField = styled.div`
  display: flex;
  position: absolute;
  right: 24px;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--black);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  overflow: hidden;
`;

const ImgField = styled.div`
  overflow-x: scroll;
  white-space: nowrap;

  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const ImgCard = styled.img`
  object-fit: contain;
  width: 100%;
`;
