//아이템 상세보기 type
export interface itemDetailInfo {
  idx: number;
  itemName: string;
  status: string;
  frameworkType: string;
  portNumber1: number;
  portNumber2: number;
  itemStates: string;
  lastSuccessDate: string;
  lastFailedDate: string;
  itemHistories: itemHistory[];
  itemProgresses: {
    builds: itemProgress[];
    deploys: itemProgress[];
    runs: itemProgress[];
  };
}
//하나의 프로젝트의 디테일에서 보여줄
//아이템 리스트들의 타입
export interface itemListInfo {
  idx: number;
  itemName: string;
  status: string;
  portNumber1: number;
  portNumber2: number;
  lastSuccessDate: string;
  lastFailedDate: string;
}

export interface itemHistory {
  idx: number;
  status: string;
  state: string;
  message: string;
  registerTime: string;
}

export interface itemProgress {
  idx: number;
  status: string;
}
