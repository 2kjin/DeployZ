import styled from "styled-components";
import BarChart from "./BarChart";

export default function BuildChart({
  branches,
}: {
  branches: { [key: string]: number };
}) {
  const labels = Object.keys(branches);
  const data = Object.values(branches);

  return (
    <ChartWrapper>
      <BarChart data={data} labels={labels} />
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  width: 100%;
  height: 18rem;
`;
