import { Column, Entity, ManyToOne } from 'typeorm';

import { CreateDate, StringID } from './base';
import { Institution } from './institution.entity';

@Entity('news')
@CreateDate()
export class News extends StringID {
  @ManyToOne((type) => Institution, (institution) => institution.news)
  institution: Institution;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  source: string;

  @Column({ type: 'text', nullable: true })
  author: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  content: string | null;
}
