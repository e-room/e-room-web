import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { SubTitle1 } from "styles/typography";
import Button from "./Button";

export default () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Container>
      <Title>이 지역에 건물이 없어요</Title>
      <Button
        type={"secondary"}
        size={"md"}
        label={"돌아가기"}
        onClick={goBack}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  height: calc(100vh - 250px);
`;

const Title = styled.div`
  ${SubTitle1}
  color: var(--gray-1);
`;
