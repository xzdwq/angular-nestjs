// ks6a
import { ProjectEntity } from '@src/orm/entities/ks6a/project.entity';
import { ObjectEstimateEntity } from '@src/orm/entities/ks6a/object_estimate.entity';
import { EstimateEntity } from '@src/orm/entities/ks6a/estimate.entity';
import { Ks6aJournalEntity } from '@src/orm/entities/ks6a/journal.entity';
import { Ks6aItemEntity } from '@src/orm/entities/ks6a/ks6a_item.entity';
import { ExecutionEntity } from '@src/orm/entities/ks6a/execution.entity';
import { RemainderEntity } from '@src/orm/entities/ks6a/remainder.entity';

export const entities = [
  ProjectEntity,
  ObjectEstimateEntity,
  EstimateEntity,
  Ks6aJournalEntity,
  Ks6aItemEntity,
  ExecutionEntity,
  RemainderEntity,
];

export {
  ProjectEntity,
  ObjectEstimateEntity,
  EstimateEntity,
  Ks6aJournalEntity,
  Ks6aItemEntity,
  ExecutionEntity,
  RemainderEntity,
};
