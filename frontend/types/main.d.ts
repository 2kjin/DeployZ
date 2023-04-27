interface IStepItem {
  number: number;
  desc: String;
  status: String;
}

interface IProject {
  projectConfig: IProjectConfig;
  itemList: IItem[];
  gitConfig: IGitConfig;
  nginxConfig: INginxConfig;
}

interface IProjectConfig {
  projectName: string;
  description: string;
  imageUrl: string;
}

interface IItem {
  [key: string]: string;
  itemName: string;
  portNumber1: string;
  portNumber2: string;
  branchName: string;
  secretToken: string;
  targetFolder: string;
  frameworkType: string;
  buildVersion: string;
}

interface IGitConfig {
  hostUrl: string;
  repositoryUrl: string;
  projectId: string;
  accessToken: string;
}

interface INginxConfig {
  domainUrl: string;
  sslCertificate: string;
  sslCertificateKey: string;
  proxyPathList: IProxyPath[];
}

interface IProxyPath {
  pathUrl: stirng;
  pathName: stirng;
}
