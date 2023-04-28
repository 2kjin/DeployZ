import styled from "styled-components";
import { FormControl } from "@mui/material";
import { alpha, styled as mstyled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { theme } from "@/styles/theme";
import { useSetRecoilState } from "recoil";
import { NginxState } from "@/recoil/step";

export default function Proxypass({
  pathItem,
  deleteProxy,
}: {
  pathItem: IProxyPath;
  deleteProxy: (index: number) => void;
}) {
  const setNginxState = useSetRecoilState(NginxState);

  const handleProxyPathListUpdate = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id as string;
    const value = target.value as string;

    setNginxState((prevNginxState) => ({
      ...prevNginxState,
      proxyPathList: prevNginxState.proxyPathList.map((proxy) =>
        proxy.idx === pathItem.idx ? { ...proxy, [id]: value } : proxy
      ),
    }));
  };

  return (
    <Container>
      <LeftContainer>
        <InputContainer>
          <InputLabel>URL</InputLabel>
          <FormControl variant="standard" sx={{ marginTop: "2%" }}>
            <InputBox
              widthSize={"23rem"}
              fontSize={"1.2rem"}
              spacingSize={3}
              placeholder={`ex) http://localhost:8080`}
              id="pathUrl"
              value={pathItem.pathUrl}
              onChange={handleProxyPathListUpdate}
            />
          </FormControl>
        </InputContainer>
        <InputContainer>
          <InputLabel>Path</InputLabel>
          <FormControl variant="standard">
            <InputBox
              widthSize={"23rem"}
              fontSize={"1.2rem"}
              spacingSize={3}
              placeholder={`ex) /api`}
              id="pathName"
              value={pathItem.pathName}
              onChange={handleProxyPathListUpdate}
            />
          </FormControl>
        </InputContainer>
      </LeftContainer>
      <RightContainer>
        {pathItem.idx !== 0 && (
          <DeleteBtn onClick={() => deleteProxy(pathItem.idx)}>삭제</DeleteBtn>
        )}
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputLabel = styled.div`
  font-size: 1.5rem;
  color: #151649;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  padding-left: 0;
`;

const DeleteBtn = styled.div`
  background-color: ${theme.colors.error};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  padding: 0.7rem 1.3rem;
  margin-left: 1rem;
  cursor: pointer;
  :hover {
    transform: scale(1.03);
  }
`;

const InputBox = mstyled(InputBase)<{
  widthSize: string;
  fontSize: string;
  spacingSize: number;
}>(({ theme, widthSize, fontSize, spacingSize }) => ({
  "label + &": {
    marginTop: theme.spacing(spacingSize),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: fontSize,
    width: widthSize,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color"]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    // 글꼴 설정 추가
    fontFamily: "Pretendard",
  },
}));

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`;
