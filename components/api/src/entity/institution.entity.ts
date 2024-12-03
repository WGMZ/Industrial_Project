import { Column, Entity, OneToMany } from 'typeorm';

import { CreateDate, StringID } from './base';
import { News } from './news.entity';

@Entity('institution')
@CreateDate()
export class Institution extends StringID {
  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', unique: true })
  symbol: string;

  @Column({ type: 'jsonb', default: [] })
  keywords: string[];

  @OneToMany((type) => News, (news) => news.institution)
  news: News[];
}
