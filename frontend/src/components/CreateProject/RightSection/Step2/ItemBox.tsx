import { useEffect, useState } from "react";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { alpha, styled as mstyled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { itemListState } from "@/recoil/step";
import { requestVersion } from "@/api/projectCreate";

export default function ItemBox({
  itemName,
  branchList,
}: {
  itemName: string;
  branchList: string[];
}) {
  const [itemList, setItemList] = useRecoilState<IItem[]>(itemListState);
  const [item, setItem] = useState<IItem>(defaultItem);
  const [versionList, setVersionList] = useState<string[]>([]);

  // FE, BE 별로 placeholder 결정해주는 함수
  const handlePlaceholder = (value: string) => {
    if (itemName == "Front-end") return INPUTFORM[0][value];
    if (itemName == "Back-end") return INPUTFORM[1][value];
    else return INPUTFORM[1][value];
  };

  // 컴포넌트 state의 change handler
  const handleItemData = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.id as string;
    const value = target.value as string;

    setItem((cur) => ({
      ...cur,
      [id]: value,
    }));
  };

  // 컴포넌트 state의 change handler
  const handleSelectChange = (e: SelectChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const id = target.name as string;
    const value = target.value as string;

    // value가 있는 select를 클릭했을때만 하위 version request fetch
    if (id === "frameworkType" && value !== "none") {
      getVersion(value);
    }
    setItem((cur) => ({
      ...cur,
      [id]: value,
    }));
  };

  /**
   * itemName같으면 새로 추가하고 다르다면 뒤에 추가
   */
  const saveInfo = () => {
    setItemList((prev: IItem[]) => {
      const index = prev.findIndex(
        (prevItem) => prevItem.itemName === item.itemName
      );
      if (index === -1) {
        return [...prev, item];
      } else {
        const newArray = [...prev];
        newArray[index] = item;
        return newArray;
      }
    });
  };

  const getVersion = async (value: string) => {
    const { data } = await requestVersion(value);
    setVersionList(data);
  };

  // recoil에 저장된 이미 사용자가 입력한 값을 띄워주기위한 set
  useEffect(() => {
    itemList.map((item: IItem) => {
      if (item.itemName === itemName) setItem(item);
    });
  }, []);

  return (
    <Container>
      <InputContainer>
        <Subject>{itemName}</Subject>
        <SaveBtn onClick={saveInfo}>저장</SaveBtn>
      </InputContainer>
      {/* 첫번째 줄 */}
      <InputContainer>
        <FormControl variant="standard">
          <InputLabel shrink sx={{ fontSize: "1.9rem", color: "#151649" }}>
            Item Name
          </InputLabel>
          <InputBox
            placeholder={`컨테이너 명을 입력세요. ex) ${handlePlaceholder(
              "ItemName"
            )}`}
            id="itemName"
            value={item.itemName}
            // onChange={handleItemData}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel shrink sx={{ fontSize: "1.9rem", color: "#151649" }}>
            Port Number 1
          </InputLabel>
          <InputBox
            placeholder={`할당할 포트번호를 입력하세요. ex) ${handlePlaceholder(
              "Port1"
            )}`}
            id="portNumber1"
            value={item.portNumber1}
            onChange={handleItemData}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel shrink sx={{ fontSize: "1.9rem", color: "#151649" }}>
            Port Number 2
          </InputLabel>
          <InputBox
            placeholder={`할당할 포트번호를 입력하세요. ex) ${handlePlaceholder(
              "Port2"
            )}`}
            id="portNumber2"
            value={item.portNumber2}
            onChange={handleItemData}
          />
        </FormControl>
      </InputContainer>
      {/* 2번째 줄 */}
      <InputContainer>
        {/* <FormControl variant="standard">
          <InputLabel shrink sx={{ fontSize: "1.9rem", color: "#151649" }}>
            Branch Name
          </InputLabel>
          <InputBox
            placeholder={`브랜치명을 입력하세요. ex) ${handlePlaceholder(
              "BranchName"
            )}`}
            id="branchName"
            value={item.branchName}
            onChange={handleItemData}
          />
        </FormControl> */}
        <FormControl variant="standard">
          <InputLabel shrink sx={{ fontSize: "1.9rem", color: "#151649" }}>
            Branch Name
          </InputLabel>
          <Select
            sx={{
              width: "28.5rem",
              fontSize: "1.4rem",
              padding: "0.7rem 0",
            }}
            name="branchName"
            defaultValue={"none"}
            value={item.branchName}
            onChange={handleSelectChange}
          >
            <MenuItem value="none" sx={{ fontSize: "1.4rem" }}>
              <em>선택하세요.</em>
            </MenuItem>
            {branchList.map((branch, idx) => (
              <MenuItem key={idx} value={branch} sx={{ fontSize: "1.4rem" }}>
                {branch}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel shrink sx={{ fontSize: "1.9rem", color: "#151649" }}>
            Target Folder
          </InputLabel>
          <InputBox
            placeholder={`해당 폴더를 입력하세요. ex) ${handlePlaceholder(
              "TargetFolder"
            )}`}
            id="targetFolder"
            value={item.targetFolder}
            onChange={handleItemData}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ visibility: "hidden" }}>
          <InputLabel>EMPTY</InputLabel>
          <InputBox />
        </FormControl>
      </InputContainer>
      {/* 3번째 줄 */}
      <InputContainer>
        <FormControl variant="standard">
          <InputLabel shrink sx={{ fontSize: "1.9rem", color: "#151649" }}>
            Framework
          </InputLabel>
          <Select
            sx={{
              width: "28.5rem",
              fontSize: "1.4rem",
              padding: "0.7rem 0",
            }}
            name="frameworkType"
            value={item.frameworkType}
            onChange={handleSelectChange}
          >
            <MenuItem value="none" sx={{ fontSize: "1.4rem" }}>
              <em>선택하세요.</em>
            </MenuItem>
            <MenuItem
              value={handlePlaceholder("Framework")}
              sx={{ fontSize: "1.4rem" }}
            >
              {handlePlaceholder("Framework")}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel shrink sx={{ fontSize: "1.9rem", color: "#151649" }}>
            Build Version
          </InputLabel>
          <Select
            sx={{
              width: "28.5rem",
              fontSize: "1.4rem",
              padding: "0.7rem 0",
            }}
            name="buildVersion"
            value={item.buildVersion}
            onChange={handleSelectChange}
          >
            <MenuItem value="none" sx={{ fontSize: "1.4rem" }}>
              <em>선택하세요.</em>
            </MenuItem>
            {versionList.map((version, idx) => (
              <MenuItem key={idx} value={version} sx={{ fontSize: "1.4rem" }}>
                {version}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ visibility: "hidden" }}>
          <InputLabel>EMPTY</InputLabel>
          <Select
            sx={{
              width: "28.5rem",
            }}
          />
        </FormControl>
      </InputContainer>
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

const SaveBtn = styled.div`
  width: 5rem;
  background-color: ${theme.colors.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5%;
`;

interface InputForm {
  [key: string]: string | number;
}

const INPUTFORM: InputForm[] = [
  {
    ItemName: "FE",
    Port1: 3000,
    Port2: 3001,
    BranchName: "fe-develop",
    TargetFolder: "/frontend",
    Framework: "React",
  },
  {
    ItemName: "BE",
    Port1: 8081,
    Port2: 8082,
    BranchName: "be-develop",
    TargetFolder: "/backend",
    Framework: "Springboot",
  },
];

const defaultItem: IItem = {
  itemName: "",
  portNumber1: "",
  portNumber2: "",
  branchName: "",
  secretToken: "",
  targetFolder: "",
  frameworkType: "",
  buildVersion: "",
};
