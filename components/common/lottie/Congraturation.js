import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import congrat from "assets/lottie/animation-congrat.json";

export default () => {
  const likecontainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: likecontainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: congrat,
    });
  }, []);
  return <div className="w-[256px] h-[256px]" ref={likecontainer} />;
};
