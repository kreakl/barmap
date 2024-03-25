import { FindOptionsWhere, ObjectId } from 'typeorm';

export type TypeORMId<Model> =
  | FindOptionsWhere<Model>
  | string
  | number
  | Date
  | ObjectId
  | string[]
  | number[]
  | Date[]
  | ObjectId[];
