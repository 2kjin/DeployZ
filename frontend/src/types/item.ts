//아이템 상세보기 type
export interface itemDetailInfo {
  idx: number;
  itemName: string;
  status: string;
  frameworkType: string;
  portNumber: number;
  itemStates: string;
  lastSuccessDate: string;
  lastFailureDate: string;
  itemHistories: itemHistory[];
  itemProgresses: {
    builds: itemProgress[];
    deploys: itemProgress[];
    runs: itemProgress[];
  };
}
//하나의 프로젝트 디테일에서 보여줄
//아이템 별 빌드 횟수
export interface itemBuildCount {
  itemName: string;
  itemCnt: number;
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
