import { theme } from "@/styles/theme";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { itemListState } from "@/recoil/step";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import MouseIcon from "@mui/icons-material/Mouse";

export default function InputSection2() {
  const itemList = useRecoilValue<IItem[]>(itemListState);

  const itemName = itemList.map((item: IItem) => {
    return [item.itemName, item.secretToken];
  });

  return (
    <Container>
      <p className="subject">Git 정보 입력</p>
      {/* 둘째 줄 */}
      <InputContainer>
        <Section>
          <Label>Webhook 연결</Label>
          <p>
            자동 배포 기능을 사용하려면 레포지토리에 직접 Branch별로 Webhook을
            연결해야해요.
          </p>
          <SectionGuide>
            <p>방법을 잘 모르시겠다면,</p>
            {"  "}
            <GuildButton>
              가이드 보러가기{" "}
              <MouseIcon sx={{ fontSize: 18, marginLeft: 0.3 }} />
            </GuildButton>
          </SectionGuide>
        </Section>
        <Section>
          <Label>Secret Token</Label>
          {itemName.map((item) => {
            return (
              <SecretSection>
                <SecretLeft># {item[0]}</SecretLeft>
                <SecretRight>{item[1]}</SecretRight>
              </SecretSection>
            );
          })}
          <SecretLeft className="alert">
            <SdCardAlertIcon sx={{ fontSize: "2.5rem" }} />
            Secret Token은 따로 저장해 보관해야해요!
          </SecretLeft>
        </Section>
      </InputContainer>
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

const InputContainer = styled.div`
  width: 82%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
`;

const Label = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  color: #151649;
  margin: 0;
`;

const GuildButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px ${theme.colors.secondary};
  color: ${theme.colors.secondary};
  font-size: 1.5rem;
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;

  :hover {
    color: white;
    background-color: ${theme.colors.secondary};
    transition: all 0.3s ease-out;
  }
`;

const Section = styled.div`
  width: 42rem;

  .alert {
    font-size: 1.5rem;
    color: ${theme.colors.error};
    display: flex;
    align-items: center;
  }

  p,
  span {
    font-size: 1.5rem;
  }
`;

const SectionGuide = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0.3rem 0.1rem;
  }
`;

const SecretSection = styled.div`
  display: flex;
  width: 100%;
`;

const SecretLeft = styled.div`
  flex: 0.8;
  font-weight: bold;
  font-size: 1.7rem;
  padding: 1rem 0;
`;

const SecretRight = styled.div`
  font-size: 1.5rem;
  flex: 2;
  display: flex;
  align-items: center;
`;
