import { theme } from "@/styles/theme";
import styled from "styled-components";
import { alpha, styled as mstyled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { FormControl, InputLabel } from "@mui/material";

export default function ItemBox({ itemName }: { itemName: String }) {
  return (
    <Container>
      <Subject>{itemName}</Subject>
      {/* 첫번째 줄 */}
      <InputContainer>
        <FormControl variant="standard">
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            sx={{ fontSize: "1.9rem", color: "#151649" }}
          >
            Item Name
          </InputLabel>
          <InputBox
            placeholder={`컨테이너 명을 입력세요. ex) ${
              itemName == "Front-end"
                ? INPUTFORM[0].ItemName
                : INPUTFORM[1].ItemName
            }`}
            id="bootstrap-input"
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            sx={{ fontSize: "1.9rem", color: "#151649" }}
          >
            Port Number 1
          </InputLabel>
          <InputBox
            placeholder={`할당할 포트번호를 입력하세요. ex) ${
              itemName == "Front-end" ? INPUTFORM[0].Port1 : INPUTFORM[1].Port1
            }`}
            id="bootstrap-input"
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            sx={{ fontSize: "1.9rem", color: "#151649" }}
          >
            Port Number 2
          </InputLabel>
          <InputBox
            placeholder={`할당할 포트번호를 입력하세요. ex) ${
              itemName == "Front-end" ? INPUTFORM[0].Port2 : INPUTFORM[1].Port2
            }`}
            id="bootstrap-input"
          />
        </FormControl>
      </InputContainer>
      {/* 2번째 줄 */}
      <InputContainer>
        <FormControl variant="standard">
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            sx={{ fontSize: "1.9rem", color: "#151649" }}
          >
            Branch Name
          </InputLabel>
          <InputBox
            placeholder={`브랜치명을 입력하세요. ex) ${
              itemName == "Front-end"
                ? INPUTFORM[0].BranchName
                : INPUTFORM[1].BranchName
            }`}
            id="bootstrap-input"
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            sx={{ fontSize: "1.9rem", color: "#151649" }}
          >
            Target Folder
          </InputLabel>
          <InputBox
            placeholder={`해당 폴더를 입력하세요. ex) ${
              itemName == "Front-end"
                ? INPUTFORM[0].TargetFolder
                : INPUTFORM[1].TargetFolder
            }`}
            id="bootstrap-input"
          />
        </FormControl>
        <FormControl variant="standard" sx={{ visibility: "hidden" }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            EMPTY
          </InputLabel>
          <InputBox id="bootstrap-input" />
        </FormControl>
      </InputContainer>
      {/* 3번째 줄 */}
    </Container>
  );
}

const InputBox = mstyled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "26rem",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Container = styled.div`
  width: 80%;
  height: 50%;
  background-color: ${theme.colors.container};
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  margin-bottom: 1%;
`;

const Subject = styled.p`
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.7%;
  font-size: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1%;
`;

const INPUTFORM = [
  {
    ItemName: "FE",
    Port1: 3000,
    Port2: 3001,
    BranchName: "fe-develop",
    TargetFolder: "/frontend",
  },
  {
    ItemName: "BE",
    Port1: 8081,
    Port2: 8082,
    BranchName: "be-develop",
    TargetFolder: "/backend",
  },
];
