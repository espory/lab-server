export enum ResultStatus {
  success = 'succeed',
  fail = 'failed',
}

export enum StatusCode {
  success = '1000', // 成功
  dataError = '1001', // 服务处理异常
  unlogin = '1002', // 用户未登录
  paramsError = '1003', // 参数错误
}

export interface ResultType<T = any> {
  code?: string;
  msg: string;
  status: ResultStatus;
  data?: T;
  extInfo?: {[key: string]: any};
}

export default class Response<T> implements ResultType<T> {
  public msg: string;
  public code: string;
  public status: ResultStatus;
  public data: T;
}
