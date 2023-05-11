//아이템 상세보기 type
export interface itemDetailInfo {
  itemIdx: number;
  portNumber1: number;
  portNumber2: number;
  itemName: string;
  frameworkType: string;
  status: string;
  lastSuccessDate: string;
  lastFailureDate: string;
  buildHistories: itemHistory[];
}

export interface itemHistory {
  idx: number;
  status: string;
  consol: string;
  registerDate: string;
}
