import styled from "styled-components";
import { theme } from "@/styles/theme";
import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiNumber6,
} from "react-icons/ri";
import webhook1 from "@/assets/guide/webhook1.png";
import webhook2 from "@/assets/guide/webhook2.png";
import webhook3 from "@/assets/guide/webhook3.png";
import webhook4 from "@/assets/guide/webhook4.png";
import webhook5 from "@/assets/guide/webhook5.png";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { alpha, styled as mstyled } from "@mui/material/styles";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import { info } from "@components/common/Toast/notify";

import { FormControl, InputBase } from "@mui/material";
import { useState } from "react";

export default function WebhookGuideModal() {
  const [Inputdata, setInputdata] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputdata(event.target.value);
  };

  const timelineData = [
    {
      icon: <RiNumber1 />,
      title: "1. GitLab에서 Setting → Webhooks 접속",
      content: (
        <Contentdiv>
          <SImg1 src={webhook1} />
        </Contentdiv>
      ),
    },
    {
      icon: <RiNumber2 />,
      title: "2. 배포할 도메인 입력",
      content: (
        <Contentdiv>
          <FormControl variant="standard">
            <InputBox
              widthnum={"30rem"}
              fontnum={"1.3rem"}
              spacingnum={4}
              placeholder={`ex) deployz.co.kr`}
              onChange={handleInputChange}
            />
          </FormControl>
          <CopyToClipboard
            className="Toram"
            text={`https://${Inputdata}/git/webhook`}
            onCopy={() => info("복사되었습니다.")}
          >
            <ColorContainer>
              <text>https://{Inputdata}/git/webhook</text>
              <CopyIcon />
            </ColorContainer>
          </CopyToClipboard>
          <SImg2 src={webhook2} />
        </Contentdiv>
      ),
    },
    {
      icon: <RiNumber3 />,
      title: "3. Secret Token 입력",
      content: (
        <Contentdiv>
          <ColorContainer>
            각 branch별로 발급된 Secret Token을 확인해서 넣어주세요!
          </ColorContainer>
          <SImg2 src={webhook3} />
        </Contentdiv>
      ),
    },
    {
      icon: <RiNumber4 />,
      title: "4. Push events 체크",
      content: (
        <Contentdiv>
          <ColorContainer>
            Push events 체크 후, Target branch를 입력해주세요.
          </ColorContainer>
          <SImg3 src={webhook4} />
        </Contentdiv>
      ),
    },
    {
      icon: <RiNumber5 />,
      title: "5. Webhooks 등록",
      content: (
        <Contentdiv>
          <ColorContainer>
            이벤트 발생 시점과 함께 Webhook이 등록돼요
          </ColorContainer>
          <SImg4 src={webhook5} />
        </Contentdiv>
      ),
    },
    {
      icon: <RiNumber6 />,
      title: "6. 이벤트 발생 및 Webhook 호출",
      content: (
        <Contentdiv>
          <ColorContainer>
            해당 branch에 Push events가 발생하면 자동으로 감지해 배포가
            진행됩니다.
          </ColorContainer>
        </Contentdiv>
      ),
    },
  ];

  return (
    <>
      <ModalContainer>
        <VerticalTimeline
          lineColor={`${theme.colors.secondary}`}
          layout="1-column"
        >
          {timelineData.map((data, index) => (
            <VerticalTimelineElement
              intersectionObserverProps={{
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
              }}
              key={index}
              iconStyle={{
                background: `${theme.colors.secondary}`,
                color: `${theme.colors.white}`,
              }}
              icon={data.icon}
              contentStyle={{
                borderRadius: "1rem",
                width: "88%",
                padding: "1rem",
              }}
              style={{ margin: "1rem 0" }}
            >
              <NumTitle>{data.title}</NumTitle>
              {data.content}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </ModalContainer>
    </>
  );
}

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 53%;
  height: 95%;
  border: none;
  padding: 0 1rem;
  /* box-shadow: 0 2px 4px, 0px 1px 2px inset; */
  border-radius: 4vh;
  /* background: ${theme.colors.container}; */
  color: ${theme.colors.primary};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Icondiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  position: sticky;
`;
const NumTitle = styled.div`
  display: flex;
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  padding-bottom: 0.5rem;
  font-size: 2.2rem;
`;
const Contentdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 0;
`;
const ColorContainer = styled.div`
  background-color: ${theme.colors.lightgray};
  font-weight: ${theme.fontWeight.semibold};
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;
const CopyIcon = mstyled(ContentCopyIcon)({
  marginLeft: "1rem",
  color: `${theme.colors.primary}`,
  "&:hover": {
    color: `${theme.colors.secondary}`,
    transition: "all .2s ease-out",
    transform: "scale(1.3)",
    cursor: "pointer",
  },
});
const SImg1 = styled.img`
  height: 14rem;
  padding: 1rem 0;
`;
const SImg2 = styled.img`
  height: 16rem;
  padding: 1rem 0;
`;
const SImg3 = styled.img`
  width: 40rem;
  padding: 1rem 0;
`;
const SImg4 = styled.img`
  width: 45rem;
  padding: 1rem 0;
`;
const InputBox = mstyled(InputBase)<{
  widthnum: string;
  fontnum: string;
  spacingnum: number;
}>(
  ({
    theme,
    widthnum: widthnum,
    fontnum: fontnum,
    spacingnum: spacingnum,
  }) => ({
    "label + &": {
      marginTop: theme.spacing(spacingnum),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: fontnum,
      width: widthnum,
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
      ]),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
      // 글꼴 설정 추가
      fontFamily: "Pretendard",
    },
  })
);
// const timelineData = [
//   {
//     icon: <RiNumber1 />,
//     title: "1. GitLab에서 Setting → Webhooks 접속",
//     content: (
//       <Contentdiv>
//         <SImg1 src={webhook1} />
//       </Contentdiv>
//     ),
//   },
//   {
//     icon: <RiNumber2 />,
//     title: "2. URL 입력",
//     content: (
//       <Contentdiv>
//         <FormControl variant="standard">
//           <InputBox
//             widthnum={"40rem"}
//             fontnum={"1.8rem"}
//             spacingnum={4}
//             placeholder={`ex) RIiCysmWxzLKJyETfaqf`}
//             onChange={handleInputChange}
//           />
//         </FormControl>
//         <CopyToClipboard
//           className="Toram"
//           text="sudo systemctl stop nginx"
//           onCopy={() => info("복사되었습니다.")}
//         >
//           <ColorContainer>
//             <text>[사용할 도메인 주소]/git/webhook</text>
//             <CopyIcon />
//           </ColorContainer>
//         </CopyToClipboard>
//         <SImg2 src={webhook2} />
//       </Contentdiv>
//     ),
//   },
//   {
//     icon: <RiNumber3 />,
//     title: "3. Secret Token 입력",
//     content: (
//       <Contentdiv>
//         <ColorContainer>
//           화면에서 발급된 Secret Token을 복사해서 넣어주세요!
//         </ColorContainer>
//         <SImg2 src={webhook3} />
//       </Contentdiv>
//     ),
//   },
//   {
//     icon: <RiNumber4 />,
//     title: "4. Push events 체크",
//     content: (
//       <Contentdiv>
//         <ColorContainer>
//           Push events 체크 후, Target branch를 입력해주세요.
//         </ColorContainer>
//         <SImg3 src={webhook4} />
//       </Contentdiv>
//     ),
//   },
//   {
//     icon: <RiNumber5 />,
//     title: "5. Webhooks 등록",
//     content: (
//       <Contentdiv>
//         <ColorContainer>
//           이벤트 발생 시점과 함께 Webhook이 등록돼요
//         </ColorContainer>
//         <SImg4 src={webhook5} />
//       </Contentdiv>
//     ),
//   },
//   {
//     icon: <RiNumber6 />,
//     title: "6. 이벤트 발생 및 Webhook 호출",
//     content: (
//       <Contentdiv>
//         <ColorContainer>
//           해당 branch에 Push events가 발생하면 자동으로 감지해 배포가
//           진행됩니다.
//         </ColorContainer>
//       </Contentdiv>
//     ),
//   },
// ];
