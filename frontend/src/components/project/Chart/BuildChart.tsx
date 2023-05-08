import styled from "styled-components";
import BarChart from "./BarChart";
import { itemBuildCount } from "@/types/item";

interface Props {
  itemBuildData: itemBuildCount[];
}

export default function BuildChart({ itemBuildData }: Props) {
  const data = itemBuildData.map((item) => item.itemCnt);
  const labels = itemBuildData.map((item) => item.itemName);

  return (
    <ChartWrapper>
      <BarChart data={data} labels={labels} />
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  width: 28rem;
  height: 18rem;
`;
