import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch()
export class HttpUnexpectedErrorFilter {
  async catch(err: Error, ctx: Context) {
    ctx.status = 500;
    ctx.logger.error(err);

    return { success: false, message: 'Internal Server Error' };
  }
}
