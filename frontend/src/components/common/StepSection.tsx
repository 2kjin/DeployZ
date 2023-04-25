import styled from "styled-components";
import StepItem from "@components/CreateProject/LeftSection/StepItem";
import { useRecoilState } from "recoil";
import { stepState } from "@/recoil/step";

export default function StepSection() {
  const [stepInfo, setStepInfo] = useRecoilState<IStepItem[]>(stepState);
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

// const ItemInfo: IStepItem[] = [
//   {
//     number: 1,
//     desc: "Project 설정 정보 입력",
//     status: "after",
//   },
//   {
//     number: 2,
//     desc: "Item 정보 입력",
//     status: "now",
//   },
//   {
//     number: 3,
//     desc: "Git 정보 입력",
//     status: "before",
//   },
//   {
//     number: 4,
//     desc: "Nginx 설정 정보 입력",
//     status: "before",
//   },
// ];
