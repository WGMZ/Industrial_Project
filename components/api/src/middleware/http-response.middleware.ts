import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class HttpResponseMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 控制器前执行的逻辑
      ctx.startTime = performance.now();

      // 执行下一个 Web 中间件，最后执行到控制器，这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();

      // 控制器之后执行的逻辑，触发 logger
      // console.log(ctx.logger);
      ctx.logger.debug('');

      if (result && result.stream) return result.stream;

      return { success: true, ...result };
    };
  }

  static getName(): string {
    return 'HttpResponse';
  }
}
