import { theme } from "@/styles/theme";
import styled from "styled-components";

const tempChapter = 1;

export default function FooterNav() {
  return (
    <Container>
      <Left>
        <NavBtn chapter={tempChapter} className="Infra">
          인프라 가이드 보러가기
        </NavBtn>
      </Left>
      <Right>
        <NavBtn chapter={tempChapter} className="back">
          이전 단계
        </NavBtn>
        <NavBtn chapter={tempChapter} className="next">
          다음 단계
        </NavBtn>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 8vh;
`;

const Left = styled.div`
  flex: 1.22;
  margin: 0rem 1.5rem;
  padding: 0;

  .Infra {
    width: 17rem;
    background-color: ${theme.colors.pending};
    color: ${theme.colors.primary};
    font-weight: bold;
  }
`;

const Right = styled.div`
  flex: 4;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0rem 1.5rem;
  padding: 0;

  .back {
    background-color: ${theme.colors.error};
  }

  .next {
    background-color: ${theme.colors.secondary};
  }
`;

const NavBtn = styled.div<{ chapter: Number }>`
  background-color: ${theme.colors.darkgray};
  border-radius: 10px;
  padding: 1rem;
  width: 10rem;
  height: 45%;
  color: white;
  font-size: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
