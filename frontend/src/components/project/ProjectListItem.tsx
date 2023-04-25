import React from "react";
import styled from "styled-components";
import { Card, CardContent, Typography } from "@mui/material";

//import images
import check from "../../assets/img/check.png";
import plusbotton from "../../assets/img/plusbotton.png";

const StyledCard = styled(Card)`
  width: 65vw;
  height: 12em;
  margin: 3vh auto 3vh;
  align-items: center;
  && {
    border: 2px solid #f3f4f3;
    background-color: #f3f4f3;
    box-shadow: none;
    border-radius: 1.5rem;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  && {
    padding-top: 3.5rem;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-size: 2.5rem;
    font-weight: 700;
    margin-left: 5rem;
  }
`;

const StyledButton = styled.button`
  border: 2px solid #fea51d;
  border-radius: 5rem;
  background: #fea51d;
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  width: 9rem;
  height: 5rem;
`;

const StyledImage = styled.img`
  flex-basis: 4rem;
  margin-right: 5rem;
  && {
    margin-right: 5rem;
  }
`;

const StyledPlusButtonCard = styled(Card)`
  width: 65vw;
  height: 12em;
  margin: 3vh auto 3vh;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  && {
    border: 2px solid #f3f4f3;
    background-color: #f3f4f3;
    box-shadow: none;
    border-radius: 1.5rem;
  }
`;

const StyledPlusButtonCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  && {
    padding-top: 3.5rem;
  }
`;

const StyledPlusButtonImage = styled.img`
  width: 6rem;
  height: 6rem;
  cursor: pointer;
`;

const SContainerButton = styled.button`
  border: 2px solid #d1d1d1;
  border-radius: 0.5rem;
  background: #d1d1d1;
  color: #151649;
  font-size: 1.2rem;
  font-weight: bold;
  width: 9rem;
  height: 2.5rem;
  margin-left: 1rem;
`;

const StyledItemTypography = styled(Typography)`
  && {
    font-size: 2.5rem;
    font-weight: 700;
    margin-left: 5rem;
  }
`;
const StyledSuccessTypography = styled(Typography)`
  && {
    font-size: 2.5rem;
    font-weight: 700;
    margin-left: 5rem;
  }
`;
const StyledFailTypography = styled(Typography)`
  && {
    font-size: 2.5rem;
    font-weight: 700;
    margin-left: 5rem;
  }
`;

export default function ProjectListItem() {
  return (
    <>
      <StyledCard>
        <StyledCardContent>
          <StyledImage src={check} alt="check" />
          <StyledTypography>DeployZ</StyledTypography>
          <StyledItemTypography>3</StyledItemTypography>
          <StyledSuccessTypography>
            3days
            <SContainerButton>#fe-develop</SContainerButton>
          </StyledSuccessTypography>
          <StyledFailTypography>
            3days
            <SContainerButton>#fe-develop</SContainerButton>
          </StyledFailTypography>
          <StyledButton>상세보기</StyledButton>
        </StyledCardContent>
      </StyledCard>
      <StyledPlusButtonCard>
        <StyledPlusButtonCardContent>
          <StyledPlusButtonImage src={plusbotton} alt="plusbotton" />
        </StyledPlusButtonCardContent>
      </StyledPlusButtonCard>
    </>
  );
}
