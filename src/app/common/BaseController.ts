import { Context, inject } from 'midway';
import Response, { ResultStatus, StatusCode } from './response';

export default abstract class BaseController {

  @inject()
  ctx: Context;

  public success<T = any>(data?: T) {
    const response = new Response();
    response.status = ResultStatus.success;
    response.code = StatusCode.success;
    response.data = data;
    this.ctx.body = response;
  }

  public error(e: Error, code?: StatusCode) {
    const response = new Response();
    response.status = ResultStatus.fail;
    response.code = code || StatusCode.dataError;
    response.msg = e.message;
    this.ctx.body = response;
    this.ctx.logger.error(e);
  }

  public failed<T = any>(message: string, code?: StatusCode, data?: T) {
    const response = new Response();
    response.status = ResultStatus.fail;
    response.code = code || StatusCode.dataError;
    response.msg = message;
    response.data = data;
    this.ctx.body = response;
  }
}
