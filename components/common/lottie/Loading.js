import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import loading from "assets/lottie/circle_loading-primary.json";

export default () => {
  const likecontainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: likecontainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loading,
    });
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="w-[128px] h-[128px]" ref={likecontainer} />
    </div>
  );
};
