import { Controller, Get } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

import { Institution } from '~/entity/institution.entity';

@Controller('/institution')
export class InstitutionController {
  @InjectEntityModel(Institution)
  institutionModel: Repository<Institution>;

  @Get('/')
  async getAllInstitutions() {
    const institutions = await this.institutionModel.find();

    return { data: institutions };
  }
}
