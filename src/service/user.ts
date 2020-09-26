import { provide, inject, Context, plugin } from 'midway';
import { IUserService } from '../interface';

@provide('userService')
export class UserService implements IUserService {

  @inject()
  ctx: Context;

  @plugin()
  model;

  async getUser(id: string | number): Promise<any> {
    const result = await this.ctx.model.UserModel.findOne({
      where: {
        id
      }
    });
    return result;
  }

  async login(options): Promise<any> {
    const { username: name } = options;
    const result = await this.ctx.model.UserModel.findOne({
      where: {
        name,
      }
    });
    return result;
  }

  async register(data): Promise<any> {
    const result = await this.ctx.model.UserModel.saveUser(data);
    this.ctx.logger.info('result', result);
    return result;
  }
}
