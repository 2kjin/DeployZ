import { useNavigate } from "react-router-dom";

//import css
import styled from "styled-components";
import { theme } from "@/styles/theme";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { projectListInfo } from "@/types/project";

export default function ProjectListItem({
  project,
}: {
  project: projectListInfo;
}): JSX.Element {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/project/detail/${project.idx}`);
  };

  /**
   *
   * @param value UTC기준 시간 string으로 입력
   * @returns '년 월 일'로 리턴
   */
  const timeTransfrom = (value: string) => {
    if (value === "") return "";
    // 문자열에서 Date 객체 생성
    const ts = new Date(value);

    // 한국 표준시로 변환
    const korOffset = 9 * 60; // 한국 표준시는 UTC+9
    const korTs = new Date(
      ts.getTime() + (korOffset + ts.getTimezoneOffset()) * 60000
    );

    // 년, 월, 일, 시, 분 구하기
    const year = korTs.getFullYear();
    const month = korTs.getMonth() + 1;
    const date = korTs.getDate();
    const hour = korTs.getHours();
    const minute = korTs.getMinutes();
    return `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`;
  };

  return (
    <SProjectList>
      <SDiv>
        <SItem>
          {project.status === "SUCCESS" ? (
            <CheckCircleOutlineIcon style={checkStyle} />
          ) : (
            <HighlightOffIcon style={HighlightOffIconStyle} />
          )}
        </SItem>
        <SItem>{project.projectName}</SItem>
        <SItem>{project.itemCnt}</SItem>
        <STimeItem>
          {timeTransfrom(project.lastSuccessDate)}
          <SContainerButton>{project.itemName}</SContainerButton>
        </STimeItem>
        <STimeItem>
          {timeTransfrom(project.lastFailureDate)}
          <SContainerButton>{project.itemName}</SContainerButton>
        </STimeItem>
        <SItem>
          <SButton onClick={handleItemClick}>상세보기</SButton>
        </SItem>
      </SDiv>
    </SProjectList>
  );
}

const STimeItem = styled.div`
  flex: 2;
  font-size: 2rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
`;

const SItem = styled.div`
  flex: 2;
  font-size: 2.5rem;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.primary};
`;

const SDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SProjectList = styled.div`
  display: flex;
  flex-direction: column;
  width: 78vw;
  height: 15vh;
  background: ${theme.colors.lightgray};
  overflow: hidden;
  margin: auto;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;

const HighlightOffIconStyle = {
  fontSize: "5rem",
  color: theme.colors.error,
};

const checkStyle = {
  fontSize: "5rem",
  color: theme.colors.checkgreen,
};

const SContainerButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  background: ${theme.colors.darkgray};
  color: ${theme.colors.primary};
  font-size: 1.7rem;
  font-weight: ${theme.fontWeight.medium};
  width: 6vh;
  height: 3vh;
  margin-left: 1rem;
  overflow: hidden;
`;

const SButton = styled.button`
  border: 0.5rem solid ${theme.colors.secondary};
  border-radius: 5rem;
  background: ${theme.colors.secondary};
  color: ${theme.colors.white};
  font-size: 2rem;
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  padding: 0.8rem 1.5rem;
`;
