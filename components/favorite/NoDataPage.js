import styled from "@emotion/styled";
import Empty from "assets/illust/illust-empty_heart.svg";
import Button from "components/common/atoms/Button";
import { useRouter } from "next/router";
import { Body2, Title2 } from "styles/typography";

export default () => {
  const router = useRouter();

  const onBack = () => {
    router.push(`/`);
  };

  return (
    <Container>
      <Empty />
      <Title>찜한 자취방이 없어요</Title>
      <Message>
        지도에서 자취방 실제 거주 리뷰를 둘러보고
        <br />
        마음에 드는 방을 찜해보세요
      </Message>
      <Button type={"primary"} label={"지도에서 둘러보기"} size={"md"} onClick={onBack} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: var(--white);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 16px;
  box-sizing: border-box;
`;
const Title = styled.div`
  ${Title2}
  color: var(--black);
`;
const Message = styled.div`
  ${Body2}
  color: var(--gray-1);
  text-align: center;
`;
