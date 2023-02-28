import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import styled from "@emotion/styled";
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
  return <Item ref={likecontainer} />;
};

const Item = styled.div`
  width: 256px;
  height: 256px;
`;
