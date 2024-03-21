import { Mapper } from '@bar-map/shared';
import {
  State,
  StateIsoAlphaCode2,
  StateName,
} from '@catalogue/domain/aggregates/bar-aggregate';
import { StateEntity } from '@catalogue/infrastructure/persistence/orm/entities';

export class StateMapper implements Mapper<State, StateEntity> {
  toDomain(record: StateEntity): State {
    return new State(
      new StateName(record.name),
      new StateIsoAlphaCode2(record.isoAlphaCode2),
    );
  }

  toPersistence(state: State): StateEntity {
    const entity = new StateEntity();
    entity.isoAlphaCode2 = state.isoAlphaCode2.value;
    entity.name = state.stateName.value;

    return entity;
  }
}
