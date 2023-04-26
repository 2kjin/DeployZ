import styled from "styled-components";
import { theme } from "@/styles/theme"
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { styled as mstyled } from "@mui/material/styles";

type Props = {
  handleClose: () => void;
}

export default function WebhookGuideModal({ handleClose }: Props) {
  return (
    <>
    <ModalContainer>
      <Title>
      Webhook 연결 가이드 <CloseIcon sx={{ fontSize: 50 }} onClick={handleClose}/>
      </Title><br/><br/>
    </ModalContainer>
    </>
  )
}

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 80vh;
  border: none;
  box-shadow: 0 2px 4px, 0px 1px 2px inset;
  border-radius: 4vh;
  padding : 3rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content : center; */
  background : ${theme.colors.container};
  overflow : auto ;
  ::-webkit-scrollbar {
    display: none;
}
`
const CloseIcon = mstyled(CancelRoundedIcon)({
  position : 'sticky',
  color : `${theme.colors.primary}`,
  '&:hover': {
    color: `${theme.colors.secondary}`,
    cursor: 'pointer',
  },
});

const Title = styled.div`
  color : ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  font-size : 4rem;
  display : flex;
  justify-content : space-between;
  align-items: center;
`
