import styled from "styled-components";
import { theme } from "@/styles/theme";

export default function Footer() {
  return (
    <Container>
      <ContentDiv>
        <div>
          <Content>(주) DeployZ | Sponsored by. SSAFY</Content>
          <Content>개발자 | 김은지 박민지 이경진 이민수 정상기 정지은</Content>
          <Content>Copyright © DeployZ All Rights Reserved.</Content>
        </div>
        <div>
          <Title>기능</Title>
          <Content>CI/CD 파이프라인 구축</Content>
          <Content>무중단 배포</Content>
          <Content>복잡한 절차 간소화</Content>
        </div>
        <div>
          <Title>고객센터</Title>
          <Content>이메일 : ssafy@ssafy.com </Content>
          <Content>전화번호 : 02-3429-5100 </Content>
          <Content>주소 : 역삼동 테헤란로 212</Content>
        </div>
        <div>
          <Title>이용약관</Title>
          <Title>개인정보처리방침</Title>
        </div>
      </ContentDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.container};
  padding: 10rem 0;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  width: 60%;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.darkgray};
`;

const Content = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.darkgray};
`;
