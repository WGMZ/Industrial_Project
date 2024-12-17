import { Repository } from 'typeorm';
import { Institution } from '~/entity/institution.entity';

import {
  Controller,
  Get,
} from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';

@Controller('/summary')
export class SummaryController {
  @InjectEntityModel(Institution)
  institutionModel: Repository<Institution>;

  @Get('/')
  async getSummaries() {
    const institutions = await this.institutionModel.find();

    return { data: { volatiles: institutions, decliners: institutions, negativeNews: institutions, mentions: institutions } };
  }
}
