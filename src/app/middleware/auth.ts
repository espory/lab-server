import { WebMiddleware, provide } from 'midway';
import Response, { ResultStatus, StatusCode } from '../common/response';

@provide()
export class LoginAuthMiddleware implements WebMiddleware {
  resolve() {
    return async (ctx, next) => {
      if (!ctx.session.user) {
        const response = new Response();
        response.status = ResultStatus.fail;
        response.code = StatusCode.unlogin;
        response.msg = '当前用户未登录';
        ctx.body = response;
      } else {
        await next();
      }
    };
  }
}
