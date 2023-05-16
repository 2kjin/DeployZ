import styled from "styled-components";
import StepItem from "@components/CreateProject/LeftSection/StepItem";
import { useRecoilValue } from "recoil";
import { stepState } from "@/recoil/step";
import { theme } from "@/styles/theme";

export default function StepSection() {
  const stepInfo = useRecoilValue<IStepItem[]>(stepState);

  return (
    <Container>
      {stepInfo.map((info: IStepItem, idx: number) => (
        <>
          <StepItem key={idx} item={info} />
          {idx !== 3 && (
            <LineContainer>
              <LeftBox>
                <StepLine status={info.status} />
              </LeftBox>
            </LineContainer>
          )}
        </>
      ))}
    </Container>
  );
}

const LineContainer = styled.div`
  padding: 0 1.5rem;
  flex: 2;
  display: flex;
`;

const LeftBox = styled.div`
  width: 6rem;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const StepLine = styled.div<{ status: string }>`
  width: 0.3rem;
  background-color: ${(props) =>
    props.status == "before" ? theme.colors.lightgray : theme.colors.secondary};
`;

const Container = styled.div`
  background-color: #fff;
  flex: 1.7;
  margin: 2rem 1.5rem;
  border-radius: 1rem;
  padding: 0.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
