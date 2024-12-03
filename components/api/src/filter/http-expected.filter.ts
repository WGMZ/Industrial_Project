import { Catch, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

// https://midwayjs.org/docs/error_filter#%E6%B4%BE%E7%94%9F%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86
@Catch([MidwayHttpError], {
  matchPrototype: true,
})
export class HttpExpectedErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.status = err.status || Number(err.code) || 400;
    const message = err.message;

    ctx.logger.debug('');

    return { success: false, message };
  }
}
