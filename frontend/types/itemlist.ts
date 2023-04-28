export interface ItemInfo {
  idx: number;
  itemName: string;
  frameworkType: string;
  portNumber1: number;
  portNumber2: number;
  itemStates: string;
  lastSuccessDate: string;
  lastFailedDate: string;
}

export interface itemHistory {
  idx: number;
  status: string;
  message: string;
  registerTime: string;
}
