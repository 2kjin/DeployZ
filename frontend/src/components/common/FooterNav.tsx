import { theme } from "@/styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { stepState } from "@/recoil/step";

export default function FooterNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const nowStep = Number(pathname.split("/").pop());
  const [stepInfo, setStepInfo] = useRecoilState<IStepItem[]>(stepState);

  // stepInfo의 status 변경
  const handleStatusChangeBack = (value: number) => {
    const updatedStepInfo = stepInfo.map((step, index) => {
      if (index === value - 1) {
        return { ...step, status: "now" };
      } else if (index === value) {
        return { ...step, status: "after" };
      } else {
        return step;
      }
    });
    setStepInfo(updatedStepInfo);
  };

  const handleStatusChangeNext = (value: number) => {
    const updatedStepInfo = stepInfo.map((step, index) => {
      if (index === value) {
        return { ...step, status: "after" };
      } else if (index === value + 1) {
        return { ...step, status: "now" };
      } else {
        return step;
      }
    });
    setStepInfo(updatedStepInfo);
  };

  const toBack = () => {
    handleStatusChangeBack(nowStep - 1);
    navigate(`${nowStep - 1}`);
  };

  const toNext = () => {
    handleStatusChangeNext(nowStep - 1);
    navigate(`${nowStep + 1}`);
  };
  return (
    <Container>
      <Left>
        <NavBtn className="Infra">인프라 가이드 보러가기</NavBtn>
      </Left>
      <Right chapter={nowStep}>
        <NavBtn className="back" onClick={toBack}>
          이전 단계
        </NavBtn>
        {nowStep != 4 && (
          <NavBtn className="next" onClick={toNext}>
            다음 단계
          </NavBtn>
        )}
        {nowStep == 4 && (
          <NavBtn className="next">
            <b>프로젝트 생성</b>
          </NavBtn>
        )}
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

const Right = styled.div<{ chapter: number | undefined }>`
  flex: 4;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0rem 1.5rem;
  padding: 0;

  .back {
    background-color: ${theme.colors.error};
    visibility: ${(props) => (props.chapter == 1 ? "hidden" : "")};
  }

  .next {
    background-color: ${theme.colors.secondary};
  }
`;

const NavBtn = styled.div`
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
