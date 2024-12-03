import 'tsconfig-paths/register';

import {
  App,
  Config,
  Configuration,
  ILogger,
  IMidwayApplication,
  IMidwayContainer,
  Inject,
  Logger,
  MidwayApplicationManager,
  MidwayConfig,
} from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as axios from '@midwayjs/axios';
import * as crossDomain from '@midwayjs/cross-domain';
import * as staticFile from '@midwayjs/static-file';
import * as orm from '@midwayjs/typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import * as validate from '@midwayjs/validate';
import { execSync } from 'child_process';
import { join } from 'path';
import { Repository } from 'typeorm';

import { Institution } from '~/entity/institution.entity';
import { HttpExpectedErrorFilter } from '~/filter/http-expected.filter';
import { HttpUnexpectedErrorFilter } from '~/filter/http-unexpected.filter';
import { HttpResponseMiddleware } from '~/middleware/http-response.middleware';
import { FileManager, STATIC_DIR, testTcp } from '~/utils';

@Configuration({
  imports: [
    // db
    orm,
    // http
    koa,
    validate,
    staticFile,
    // api
    axios,
    // dev
    { component: crossDomain, enabledEnvironment: ['local'] },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @Logger('coreLogger')
  logger: ILogger;

  @Config('typeorm')
  dbConfig: MidwayConfig['typeorm'];

  @Inject()
  applicationManager: MidwayApplicationManager;

  @App('koa')
  app: koa.Application;

  @InjectEntityModel(Institution)
  institutionModel: Repository<Institution>;

  async onConfigLoad(container: IMidwayContainer, mainApp: IMidwayApplication) {
    execSync('clear');

    const { host: dbHost, port: dbPort } = this.dbConfig!.dataSource!.default as { host: string; port: number };
    const dbStarted = await testTcp(dbHost, dbPort);
    if (!dbStarted) {
      this.logger.error(`Failed to connect PostgreSQL ${dbHost}:${dbPort}`);
      return;
    }

    FileManager.mkdirIfNotExists(STATIC_DIR);
  }

  async onReady(container: IMidwayContainer, mainApp: IMidwayApplication) {
    this.app.useMiddleware([HttpResponseMiddleware]);
    this.app.useFilter([HttpExpectedErrorFilter, HttpUnexpectedErrorFilter]);
  }

  async onServerReady(container: IMidwayContainer, mainApp: IMidwayApplication) {
    const framework = await container.getAsync(koa.Framework);
    const port = framework.getPort();

    this.logger.info(`http://127.0.0.1:${port}`);

    const institutions = [
      { name: 'JPMorgan Chase', symbol: 'NYSE:JPM' },
      { name: 'Bank of America', symbol: 'NYSE:BAC' },
      { name: 'Wells Fargo', symbol: 'NYSE:WFC' },
      { name: 'Citigroup', symbol: 'NYSE:C' },
      { name: 'HSBC', symbol: 'NYSE:HSBC' },
      { name: 'Barclays', symbol: 'NYSE:BCS' },
      { name: 'Goldman Sachs', symbol: 'NYSE:GS' },
      { name: 'Morgan Stanley', symbol: 'NYSE:MS' },
      { name: 'Deutsche Bank', symbol: 'NYSE:DB' },
      { name: 'Credit Suisse', symbol: 'NYSE:CS' },
      { name: 'UBS', symbol: 'NYSE:UBS' },
    ];

    for (const info of institutions) {
      const id = info.name.toLowerCase().replace(/\s+/g, '-');

      let institution = await this.institutionModel.findOne({ where: { id } });
      if (institution) {
        institution.set(info);
      } else {
        institution = this.institutionModel.create({ id, ...info });
      }

      await this.institutionModel.save(institution);
    }
  }
}
