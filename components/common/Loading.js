import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import styled from "@emotion/styled";
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
    <Container>
      <Item ref={likecontainer} />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  width: 128px;
  height: 128px;
`;
