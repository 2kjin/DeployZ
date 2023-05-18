import { atom } from "recoil";

export const chapterState = atom<number>({
  key: "chapter",

  default: 1,
});

export const stepState = atom<IStepItem[]>({
  key: "steps",

  default: [
    {
      number: 1,
      desc: "Project 설정 정보 입력",
      status: "now",
      isValid: false,
    },
    {
      number: 2,
      desc: "Item 정보 입력",
      status: "before",
      isValid: false,
    },
    {
      number: 3,
      desc: "Git 정보 입력",
      status: "before",
      isValid: true,
    },
    {
      number: 4,
      desc: "Nginx 설정 정보 입력",
      status: "before",
      isValid: false,
    },
  ],
});

const defaultProjectConfig: IProjectConfig = {
  hostUrl: "https://lab.ssafy.com/",
  repositoryUrl: "",
  projectId: "",
  projectName: "",
  description: "",
  imageUrl: "not yet",
};

const defaultItem1: IItem = {
  itemName: "",
  portNumber: "",
  branchName: "none",
  secretToken: "",
  targetFolder: "",
  frameworkType: "none",
  buildVersion: "none",
  javaVersion: "none",
};

const defaultItem2: IItem = {
  itemName: "",
  portNumber: "",
  branchName: "none",
  secretToken: "",
  targetFolder: "",
  frameworkType: "none",
  buildVersion: "none",
  javaVersion: "none",
};

const defaultProxyPath: IProxyPath = {
  idx: 0,
  pathUrl: "",
  pathName: "",
};

const defaultNginxConfig: INginxConfig = {
  domainUrl: "",
  sslCertificate: "",
  sslCertificateKey: "",
  proxyPathList: [defaultProxyPath],
};

const defaultProject: IProject = {
  projectConfig: defaultProjectConfig,
  itemList: [defaultItem1, defaultItem2],
  nginxConfig: defaultNginxConfig,
};

// 스텝 1 프로젝트 정보
export const projectConfigState = atom<IProjectConfig>({
  key: "projectConfig",
  default: defaultProjectConfig,
});

// 스텝 2 아이템 리스트
export const itemListState = atom<IItem[]>({
  key: "itemList",
  default: defaultProject.itemList,
});

// 스텝 4 Nginx 정보
export const NginxState = atom<INginxConfig>({
  key: "nginx",
  default: defaultNginxConfig,
});
