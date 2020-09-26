import { Context, controller, get, inject, provide, post, } from 'midway';
import { IUserService } from '../../interface';
import BaseController from '../common/BaseController';
import { StatusCode } from '../common/response';
import { validate, md5Pwd } from '../common/helper';

@provide()
@controller('/user')
export class UserController extends BaseController {

  @inject()
  ctx: Context;

  @inject('userService')
  service: IUserService;

  // 登录
  @post('/login')
  async login() {
    const { ctx, service } = this;
    if (!validate(this, ctx, {
      username: 'string',
      password: 'string'
    })) {
      return;
    }
    try {
      const { username, password } = ctx.request.body;
      const response = await service.login({ username, password });
      if (response) {
        const { password: pwd } = response;
        if (pwd === md5Pwd(password)) {
          this.success(response);
          this.ctx.session.user = response;
        } else {
          this.failed('抱歉，用户名或密码不正确！', StatusCode.dataError);
        }
      } else {
        this.failed('抱歉，当前用户不存在！', StatusCode.dataError);
      }
    } catch (e) {
      this.ctx.logger.info('sdf', e);
    }

  }

  @post('/register')
  async register() {
    const { ctx, service } = this;
    if (!validate(this, ctx, {
      name: 'string',
      password: 'string',
      mail: 'string',
    })) {
      return;
    }

    const { name, password, mail } = ctx.request.query;
    const response = await service.register({ name, password: md5Pwd(password), mail });
    if (response === 'create') {
      this.success('注册成功！');
    } else {
      this.failed('抱歉，用户已存在！');
    }
  }

  @get('/info/:id', { middleware: ['loginAuthMiddleware'] })
  async getUser(): Promise<void> {
    const id: number | string = this.ctx.params.id;
    const user = await this.service.getUser(id);
    this.ctx.body = {success: true, message: 'OK', data: user};
  }
}
