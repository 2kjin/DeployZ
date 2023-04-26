import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

//import img
import start from "../../assets/img/start.png";
import stop from "../../assets/img/stop.png";
import trash from "../../assets/img/trash.png";
import check from "../../assets/img/check.png";
import x from "../../assets/img/x.png";
import plusbotton from "../../assets/img/plusbotton.png";

export default function ItemListElement() {
  return (
    <>
      <SContainer>
        <SListTitleDiv>
          <Grid item xs={2}>
            <SListTitle>FE</SListTitle>
          </Grid>
          <Grid item xs={2}>
            <SListTitle>
              <SImg src={check} />
            </SListTitle>
          </Grid>
          <Grid item xs={3}>
            <SListTitle>3000,3001</SListTitle>
          </Grid>
          <Grid item xs={2}>
            <SListTitle>3days 11hr</SListTitle>
          </Grid>
          <Grid item xs={2}>
            <SListTitle>3days 11hr</SListTitle>
          </Grid>
        </SListTitleDiv>
      </SContainer>
    </>
  );
}

const SImg = styled.img``;

const SListTitleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 16vh;
  margin-top: 1vh;
  margin-bottom: 2vh;
  max-width: 45vw;
  justify-content: space-between;
`;

const SListTitle = styled.p`
  font-size: 2rem;
  font-weight: 800;
`;

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 65vw;
  height: 10vh;
  margin: 1vh auto;
  align-items: center;
  && {
    border: 2px solid #f3f4f3;
    background-color: blue;
    box-shadow: none;
    border-radius: 1.5rem;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
