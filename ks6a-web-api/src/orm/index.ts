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
import { Ks6aPeriodEntity } from '@src/orm/entities/req/ks6a_period.entity';
import { PeriodTypeEntity } from '@src/orm/entities/req/period_type.entity';

// public
import { UserEntity } from '@src/orm/entities/public/user.entity';
import { RoleEntity } from '@src/orm/entities/public/role.entity';
import { UserRoleEntity } from '@src/orm/entities/public/user_role.entity';

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
  UserEntity,
  RoleEntity,
  UserRoleEntity,
  Ks6aPeriodEntity,
  PeriodTypeEntity,
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
  UserEntity,
  RoleEntity,
  UserRoleEntity,
  Ks6aPeriodEntity,
  PeriodTypeEntity,
};
