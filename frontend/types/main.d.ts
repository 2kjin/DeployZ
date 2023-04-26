interface IStepItem {
  number: number;
  desc: String;
  status: String;
}

interface IProject {
  itemList: itemList[];
  gitConfig: IGitConfig;
  nginxConfig: INginxConfig;

  projectName: string;
  description: string;
  imageUrl: string;
}

interface IItemList {
  itemName: string;
  portNumber1: number;
  portNumber2: number;
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
  credentialId: string;
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
