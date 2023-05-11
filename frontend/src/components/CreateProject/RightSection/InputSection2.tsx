import { theme } from "@/styles/theme";
import styled from "styled-components";
import ItemBox from "./Step2/ItemBox";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chapterState,
  itemListState,
  projectConfigState,
  stepState,
} from "@/recoil/step";
import { useEffect, useState } from "react";
import { requestGitlabBranch } from "@/api/projectCreate";
import ModeIcon from "@mui/icons-material/Mode";

export default function InputSection2() {
  const projectConfig = useRecoilValue<IProjectConfig>(projectConfigState);
  const itemList = useRecoilValue<IItem[]>(itemListState);
  const [branchList, setBranchList] = useState<string[]>([]);
  const nowChapter = useRecoilValue(chapterState);
  const [steps, setSteps] = useRecoilState(stepState);

  useEffect(() => {
    // console.log(itemList);
    checkIsValid();
  }, [itemList]);

  const checkIsSave = () => {
    itemList.map((item) => {
      if (item.secretToken === "") return false;
    });
    return true;
  };

  // 스텝 바꿀때 체크
  const checkIsValid = () => {
    itemList.map((item) => {
      if (item.secretToken === "") {
        const updatedSteps = steps.map((step) => {
          if (step.number === nowChapter) {
            return { ...step, isValid: false };
          } else {
            return step;
          }
        });

        setSteps(updatedSteps);
      } else {
        const updatedSteps = steps.map((step) => {
          if (step.number === nowChapter) {
            return { ...step, isValid: true };
          } else {
            return step;
          }
        });

        setSteps(updatedSteps);
      }
    });
    // if (!checkIsSave()) {
    //   const updatedSteps = steps.map((step) => {
    //     if (step.number === nowChapter) {
    //       return { ...step, isValid: false };
    //     } else {
    //       return step;
    //     }
    //   });

    //   setSteps(updatedSteps);
    // } else {
    //   const updatedSteps = steps.map((step) => {
    //     if (step.number === nowChapter) {
    //       return { ...step, isValid: true };
    //     } else {
    //       return step;
    //     }
    //   });

    //   setSteps(updatedSteps);
    // }
  };

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
      <SubjectContainer>
        {/* <p className="subject">Item 정보 입력</p> */}
        <p className="desc">
          <ModeIcon sx={{ fontSize: "2rem" }} />
          Item별로 정보 입력후 저장을 해주세요.
        </p>
      </SubjectContainer>
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
  padding: 2.5rem;
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

const SubjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 80%;

  .desc {
    font-size: 1.7rem;
    margin-top: 0;
    color: ${theme.colors.secondary};
    font-weight: ${theme.fontWeight.bold};
    display: flex;
    align-items: center;
  }
`;
