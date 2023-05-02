import { theme } from "@/styles/theme";
import styled from "styled-components";
import ItemBox from "./Step2/ItemBox";
import { useRecoilValue } from "recoil";
import { itemListState, projectConfigState } from "@/recoil/step";
import { useEffect, useState } from "react";
import { requestGitlabBranch } from "@/api/projectCreate";

export default function InputSection2() {
  const projectConfig = useRecoilValue<IProjectConfig>(projectConfigState);
  const itemList = useRecoilValue<IItem[]>(itemListState);
  const [branchList, setBranchList] = useState<string[]>([]);

  useEffect(() => {
    const getBranchList = async (hostURL: string, projectID: string) => {
      const { data } = await requestGitlabBranch(hostURL, projectID);
      setBranchList(
        data.map((item: any) => {
          return item.name;
        })
      );
    };

    getBranchList(projectConfig.hostUrl, projectConfig.projectId);
  }, []);

  return (
    <Container>
      <p className="subject">Item 정보 입력</p>
      {itemList.map((item: IItem, idx) => (
        <ItemBox key={idx} itemName={item.itemName} branchList={branchList} />
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
