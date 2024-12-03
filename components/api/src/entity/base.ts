import { BeforeInsert, getMetadataArgsStorage, PrimaryColumn, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';

import { sortUUID } from '~/utils';
import dayjs from '~/utils/dayjs';

export class BaseEntity {
  // static create<T extends BaseEntity>(data: EntityData<T>) {
  //   const entity = new this() as T;
  //   entity.setData(entity, data);

  //   return entity;
  // }

  set<T extends this>(data: EntityData<T>) {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }

    return this;
  }

  pick<K extends keyof this>(...keys: K[]): Pick<this, K> {
    const picked = {} as Pick<this, K>;

    for (const key of keys) {
      picked[key] = this[key];
    }

    return picked;
  }

  omit<K extends keyof this>(...keys: K[]): Omit<this, K> {
    const picked = { ...this };

    for (const key of keys) {
      delete picked[key];
    }

    return picked;
  }
}

export type EntityData<T extends BaseEntity> = { [Key in keyof T]?: T[Key] };

// https://typeorm.io/entities#column-types-for-postgres
export class NumberID extends BaseEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;
}

export class StringID extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @BeforeInsert()
  setId() {
    if (!this.id) this.id = sortUUID(4);
  }
}

function dateFromDb(value: Date | null) {
  if (!value) return value;

  return dayjs(value).tz('Asia/Singapore').format('YYYY-MM-DD HH:mm:ss');
}
function dateToDb() {
  return dayjs.utc().toDate();
}
function dateToDbNullable(value?: Date | null) {
  return value;
}
export const DateTransformer: ValueTransformer = { from: dateFromDb, to: dateToDb };
/** 传入空时为空 */
export const DateTransformerNullable: ValueTransformer = { from: dateFromDb, to: dateToDbNullable };

export function CreateDate() {
  return (cls: Function) => {
    getMetadataArgsStorage().columns.push({
      target: cls,
      propertyName: 'createdAt',
      mode: 'createDate',
      options: { transformer: DateTransformer },
    });
  };
}
