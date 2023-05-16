import styled from "styled-components";
import { theme } from "@/styles/theme";
import LogoPic from "@/assets/logo/logo3.png";

export default function Footer() {
  return (
    <Container>
      <ContentDiv>
        <div>
          <Logo alt="logo" src={LogoPic} />
          <Content>DeployZ | Sponsored by. SSAFY</Content>
          <Content>Backend | 이민수 김은지 박민지 </Content>
          <Content>Frontend | 정상기 이경진 정지은 </Content>
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
        <Bottom>Copyright ©2023 DeployZ All Rights Reserved.</Bottom>
      </ContentDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.container};
  padding: 5rem 0;
  height: 25vh;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  width: 60%;
`;
const Logo = styled.img`
  width: 15rem;
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
const Bottom = styled.div`
  width: 100%;
  color: ${theme.colors.darkgray};
  margin-top: 3rem;
  padding-top: 3rem;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${theme.colors.darkgray};
`;
