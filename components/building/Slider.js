import Avatar from "components/common/atoms/Avatar";
import Icon from "components/common/atoms/Icon";
import avatarImg from "assets/avatar/24.png";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

export default function Slider({ data, onClose, defaultId, authorName = "" }) {
  const index = data.findIndex((item) => item.uuid === defaultId);
  const [visible, setVisible] = useState(false);

  // TODO : touch cancel 안됨...
  useEffect(() => {
    if (visible) {
      setTimeout(() => setVisible(false), 3000);
    }
  }, [visible]);

  const onVisible = () => {
    setVisible(true);
  };
  const Arrowbutton = ({ direction, onClick }) => {
    return (
      <div
        className={`bg-slider-button rounded-full w-[40px] h-[40px] flex items-center justify-center z-[9] absolute top-[calc(50%-30px)] cursor-pointer ${
          visible
            ? "animate-arrow-button-visible"
            : "animate-arrow-button-hidden"
        }`}
        style={{ [direction]: 4 }}
        onClick={onClick}
      >
        <Icon icon={`arrow-${direction}`} size={"md"} fill={"fill-white"} />
      </div>
    );
  };
  const statusFormatter = (e) => {
    return (
      <div className="flex items-center justify-center min-h-[44px] fixed top-0 left-0 w-full">
        <div className="text-body-2 text-white">
          {e}/{data.length}
        </div>
        <div
          onClick={onClose}
          className="flex items-center justify-center absolute top-0 right-0 w-[44px] h-[44px] cursor-pointer"
        >
          <Icon icon={"x-icon"} size={"md"} fill={"fill-white"} />
        </div>
      </div>
    );
  };
  return (
    <div className="w-screen h-screen bg-black fixed top-0 left-0 z-[12] overflow-hidden touch-none">
      <div
        className="flex items-center justify-center h-full"
        onClick={onVisible}
        onTouchStart={onVisible}
        onTouchMove={onVisible}
        onTouchEnd={onVisible}
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
          useKeyboardArrows={true}
          statusFormatter={statusFormatter}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && <Arrowbutton direction="left" onClick={onClickHandler} />
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <Arrowbutton direction="right" onClick={onClickHandler} />
            )
          }
        >
          {data.map((value) => {
            return (
              <div
                className="pt-[44px] h-[calc(100vw-44px)] flex items-center overflow-hidden max-w-[720px] mx-auto relative"
                key={value.uuid}
              >
                <img src={value.url} />

                <div className="flex items-center text-white fixed bottom-[30px] w-full justify-center">
                  <Avatar
                    size={"md"}
                    img={avatarImg.src}
                    style={{ marginRight: 6 }}
                  />
                  {value?.anonymousStatus?.anonymousName ?? authorName}
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
