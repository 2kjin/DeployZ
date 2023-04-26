import { theme } from "@/styles/theme";
import styled from "styled-components";
import ItemBox from "./Step2/ItemBox";
import { useRecoilValue } from "recoil";
import { itemListState } from "@/recoil/step";

export default function InputSection2() {
  const itemList = useRecoilValue<IItem[]>(itemListState);
  return (
    <Container>
      <p className="subject">Item 정보 입력</p>
      {itemList.map((item: IItem) => (
        <ItemBox key={item.itemName} itemName={item.itemName} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  /* background-color: ${theme.colors.container}; */
  flex: 4;
  margin: 2rem 1.5rem;
  border-radius: 1rem;
  padding: 1.5rem;
  color: ${theme.colors.primary};

  .subject {
    font-size: 3.7rem;
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
