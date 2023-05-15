//아이템 상세보기 type
export interface itemDetailInfo {
  itemIdx: number;
  portNumber: number;
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
