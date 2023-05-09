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
