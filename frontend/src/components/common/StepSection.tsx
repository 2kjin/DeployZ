import styled from "styled-components";
import StepItem from "@components/CreateProject/LeftSection/StepItem";
import { useRecoilValue } from "recoil";
import { stepState } from "@/recoil/step";

export default function StepSection() {
  const stepInfo = useRecoilValue<IStepItem[]>(stepState);

  return (
    <Container>
      {stepInfo.map((info: IStepItem) => (
        <StepItem key={info.number} item={info} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  flex: 1.2;
  margin: 2rem 1.5rem;
  border-radius: 1rem;
  padding: 0.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
