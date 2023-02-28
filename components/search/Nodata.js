import styled from "@emotion/styled";
import { Caption1Bold, SubTitle1 } from "styles/typography";

export default () => {
  return (
    <Container>
      <Title>검색 결과가 없어요</Title>
      <Content>
        도로명 주소나 건물 이름으로
        <br />
        자취방 건물을 검색해보세요
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
const Title = styled.div`
  ${SubTitle1}
  color: var(--black);
`;
const Content = styled.div`
  ${Caption1Bold}
  color: var(--gray-3);
`;
