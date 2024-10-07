interface IPageInfo {
  index: number;
  size: number;
  total: number;
}

export interface FcResponse<T> {
  code: string;
  msg: string;
  record: T;
  pageInfo?: IPageInfo;
}
