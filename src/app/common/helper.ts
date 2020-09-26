import { Context } from 'midway';
import md5 from 'md5';
import { StatusCode } from '../common/response';

const salt = 'aplus@2020';

export function validate(that, ctx: Context, rule: object): boolean {
  try {
    let target = ctx.request.body;
    if (ctx.method.toLowerCase() === 'get') {
      target = ctx.request.query;
    }
    ctx.validate(rule, target);
    return true;
  } catch (e) {
    that.failed(e.errors, StatusCode.paramsError);
  }
  return false;
}

export function md5Pwd(source) {
  return md5(`${source}${salt}`);
}
