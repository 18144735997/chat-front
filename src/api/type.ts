export interface IPageInfo {
  index: number;
  size: number;
  total: number;
}

export interface Page<T> {
  DataLength: number;
  DataBase: Array<T>;
}

export interface FcResponse<T> {
  retCode: string;
  retMsg: string;
  pageInfo?: IPageInfo;
}
