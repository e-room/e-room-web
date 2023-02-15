import styled from "@emotion/styled";
import Logo from "assets/logo/Rectangle.svg";
import Button from "components/common/atoms/Button";
import { useRouter } from "next/router";
import { Body2, Title2 } from "styles/typography";

export default () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <Container>
      <Logo />
      <Title>오류가 발생했습니다</Title>
      <Message>
        불편을 드려 죄송합니다.
        <br />
        잠시 후에 다시 시도해주세요.
      </Message>
      <Button
        type={"secondary"}
        label={"돌아가기"}
        size={"md"}
        onClick={onBack}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--primary-1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 16px;
  padding-bottom: 130px;
  box-sizing: border-box;
`;
const Title = styled.div`
  ${Title2}
  color: var(--white);
`;
const Message = styled.div`
  ${Body2}
  color: var(--white);
  text-align: center;
`;
