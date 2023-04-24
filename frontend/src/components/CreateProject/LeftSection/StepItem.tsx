import { theme } from "@/styles/theme";
import styled from "styled-components";
import DoneIcon from "@mui/icons-material/Done";

export default function StepItem({ item }: { item: IStepItem }) {
  const handleStatus = (value: String) => {
    if (value == "after") return "입력 완료";
    if (value == "now") return "작성중";
    if (value == "before") return "입력전";
  };

  return (
    <Container>
      <Section>
        <Circle status={item.status}>
          {item.status == "after" ? (
            <DoneIcon sx={{ fontSize: 50 }} />
          ) : (
            item.number
          )}
        </Circle>
        <DescSection status={item.status}>
          <span>Step{item.number}</span>
          <b>{item.desc}</b>
        </DescSection>
        <StatusSection status={item.status}>
          {handleStatus(item.status)}
        </StatusSection>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  margin: 1rem 0;
  padding: 1.5rem;
  flex: 2;
  display: flex;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Circle = styled.div<{ status: String }>`
  border-radius: 50rem;
  background-color: ${(props) =>
    props.status == "before" ? theme.colors.lightgray : theme.colors.secondary};
  color: ${(props) =>
    props.status == "before" ? theme.colors.darkgray : "#fff"};
  width: 7rem;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
`;

const DescSection = styled.div<{ status: String }>`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  padding-left: 5%;
  font-size: 1.5rem;
  color: ${(props) =>
    props.status == "now" ? theme.colors.primary : theme.colors.darkgray};

  span {
    margin-bottom: 1rem;
  }
`;

const StatusSection = styled.div<{ status: String }>`
  flex: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.7rem;
  background-color: ${(props) =>
    props.status == "after"
      ? theme.colors.complete
      : props.status == "now"
      ? theme.colors.pending
      : theme.colors.lightgray};
  color: ${(props) =>
    props.status == "after"
      ? theme.colors.checkgreen
      : props.status == "now"
      ? "#4D92BB"
      : theme.colors.darkgray};
  border-radius: 1rem;
  font-size: 1.2rem;
`;
