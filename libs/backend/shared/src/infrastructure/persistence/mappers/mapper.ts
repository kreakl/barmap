// eslint-disable-next-line
export interface Mapper<DomainEntity, DbRecord, EntityJSON = any> {
  toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: DbRecord): DomainEntity;
  toJSON(entity: DomainEntity): EntityJSON;
}
