import { MidwayConfig } from '@midwayjs/core';
import { LoggerInfo } from '@midwayjs/logger';
import { join } from 'path';

import { PROJECT_DIR, STATIC_DIR } from '~/utils';

const level = 'debug';
const format = (info) => {
  return `${info.LEVEL.padEnd(5, ' ')} [${info.timestamp}] ${info.message}`;
};

const defaultConfig: MidwayConfig = {
  keys: 'scrm',

  // https://midwayjs.org/docs/logger
  midwayLogger: {
    default: {
      dir: join(PROJECT_DIR, 'logs'),
      level,
    },
    clients: {
      coreLogger: { fileLogName: 'core.log', level, format },
      appLogger: { fileLogName: 'app.log', level, format },
      typeormLogger: { fileLogName: 'db.log', level, format },
      bullLogger: { fileLogName: 'job.log', level, format },
    },
  },

  // https://midwayjs.org/docs/extensions/orm
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: 'aws-0-ap-southeast-1.pooler.supabase.com',
        ssl: {
          rejectUnauthorized: false,
        },
        port: 5432,
        username: 'postgres.lzjcuurygyixzsxagspp',
        password: '7niAPzFGfJjgXG25',
        database: 'postgres',
        synchronize: true,
        logging: false,
        entities: ['entity'],
        useUTC: true,
        migrationsTransactionMode: 'all',
        poolSize: 100,
      },
    },
  },

  // https://midwayjs.org/docs/extensions/koa
  koa: {
    port: 3001,
    // https://midwayjs.org/docs/extensions/koa#%E4%BF%AE%E6%94%B9%E4%B8%8A%E4%B8%8B%E6%96%87%E6%97%A5%E5%BF%97
    contextLoggerFormat: (info: LoggerInfo) => {
      const { ctx } = info;
      const { ip, method, url, response } = ctx;

      const userId = ctx.userId || '-';
      const traceId = ctx.traceId || ctx.tracer?.traceId || '-';
      const use = performance.now() - ctx.startTime;
      // format: '[$userId/$ip/$traceId/$use_ms $method $url]'
      const label = [`${userId}/${ip}/${traceId}`, method, url].join(' ');
      const resp = [response.status, `${use.toFixed(2)}ms`].join(' ');

      // console.log(info);
      // 参考输出格式 https://www.npmjs.com/package/morgan
      const logs = [info.LEVEL.padEnd(5, ' '), info.timestamp, `[${label}]`, `[${resp}]`];
      if (info.message) logs.push(info.message);

      return logs.join(' ');
    },
  },

  // https://midwayjs.org/docs/extensions/koa#bodyparser
  // https://github.com/koajs/bodyparser
  bodyParser: { enableTypes: ['json'], jsonLimit: '5mb' },

  // https://midwayjs.org/docs/extensions/validate
  validate: { validationOptions: { stripUnknown: true } },

  // https://midwayjs.org/docs/extensions/static_file
  staticFile: {
    dirs: {
      default: { prefix: '/static', dir: STATIC_DIR },
    },
  },

  // https://midwayjs.org/docs/extensions/axios
  axios: {
    clients: {
      vercel: { baseURL: 'https://api.vercel.com/v1' },
    },
  },

  // https://midwayjs.org/docs/extensions/cross_domain
  cors: { origin: '*', maxAge: 86400 },
};

export default defaultConfig;
