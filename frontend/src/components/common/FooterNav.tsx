import { useState } from "react";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  NginxState,
  chapterState,
  itemListState,
  projectConfigState,
  stepState,
} from "@/recoil/step";
import { requestCreateProject } from "@/api/projectCreate";
import Modal from '@mui/material/Modal';
import InfraGuideModal from '@components/modal/InfraGuideModal';
import { success } from "@components/common/Toast/notify";

export default function FooterNav() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const projectConfig = useRecoilValue<IProjectConfig>(projectConfigState);
  const itemList = useRecoilValue<IItem[]>(itemListState);
  const nginxConfig = useRecoilValue<INginxConfig>(NginxState);

  const [stepInfo, setStepInfo] = useRecoilState<IStepItem[]>(stepState);
  const [currentChapter, setCurrentChapter] =
    useRecoilState<number>(chapterState);

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
    handleStatusChangeBack(currentChapter - 1);
    setCurrentChapter(currentChapter - 1);
    checkProject();
  };

  const toNext = () => {
    handleStatusChangeNext(currentChapter - 1);
    setCurrentChapter(currentChapter + 1);
    checkProject();
  };

  const checkProject = () => {
    console.log("STEP 1 :", projectConfig);
    console.log("STEP 2 :", itemList);
    console.log("STEP 4 :", nginxConfig);
  };

  const createProject = async () => {
    const projectInfo = {
      projectConfig: projectConfig,
      itemList: itemList,
      nginxConfig: nginxConfig,
    };
    const { data } = await requestCreateProject(projectInfo);
    if (data.status === 200) {
      success("프로젝트 생성 완료!");
    }
  };

  return (
    <Container>
      <Left>
        <NavBtn className="Infra" onClick={handleOpen}>인프라 가이드 보러가기</NavBtn>
        <Modal
          open={open}
          onClose={handleClose}
          >
          <>
            <InfraGuideModal
            handleClose = {handleClose}
            />
          </>
        </Modal>
      </Left>
      <Right chapter={currentChapter}>
        <NavBtn className="back" onClick={toBack}>
          이전 단계
        </NavBtn>
        {currentChapter != 4 && (
          <NavBtn className="next" onClick={toNext}>
            다음 단계
          </NavBtn>
        )}
        {currentChapter == 4 && (
          <NavBtn className="next" onClick={createProject}>
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
  :hover {
    transform: scale(1.03);
  }
`;
