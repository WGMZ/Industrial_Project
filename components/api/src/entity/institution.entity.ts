import { Column, Entity } from 'typeorm';

import { CreateDate, StringID } from './base';

@Entity('institution')
@CreateDate()
export class Institution extends StringID {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  symbol: string;

  @Column({ type: 'jsonb', default: [] })
  keywords: string[];
}
