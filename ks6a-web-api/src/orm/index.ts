// req
import { ProjectEntity } from '@src/orm/entities/req/project.entity';
import { ObjectEstimateEntity } from '@src/orm/entities/req/object_estimate.entity';
import { EstimateEntity } from '@src/orm/entities/req/estimate.entity';
import { Ks6aEntity } from '@src/orm/entities/req/ks6a.entity';
import { Ks6aItemEntity } from '@src/orm/entities/req/ks6a_item.entity';
import { ExecutionEntity } from '@src/orm/entities/req/execution.entity';
import { RemainderEntity } from '@src/orm/entities/req/remainder.entity';
import { ContractorEntity } from '@src/orm/entities/req/contractor.entity';
import { TotalEntity } from '@src/orm/entities/req/total.entity';
import { Ks6aItemContractorEntity } from '@src/orm/entities/req/ks6a_item_contractor.entity';

export const entities = [
  ProjectEntity,
  ObjectEstimateEntity,
  EstimateEntity,
  Ks6aEntity,
  Ks6aItemEntity,
  ExecutionEntity,
  RemainderEntity,
  ContractorEntity,
  TotalEntity,
  Ks6aItemContractorEntity,
];

export {
  ProjectEntity,
  ObjectEstimateEntity,
  EstimateEntity,
  Ks6aEntity,
  Ks6aItemEntity,
  ExecutionEntity,
  RemainderEntity,
  ContractorEntity,
  TotalEntity,
  Ks6aItemContractorEntity,
};
