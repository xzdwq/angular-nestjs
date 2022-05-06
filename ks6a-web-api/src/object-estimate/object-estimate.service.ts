import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { ObjectEstimate } from '@src/dto';
import { ObjectEstimateEntity } from '@src/orm';

@Injectable()
export class ObjectEstimateService {
  constructor (
    @InjectRepository(ObjectEstimateEntity)
    private objectEstimateRepository: Repository<ObjectEstimateEntity>,
  ) {}

  getObjectEstimates (projectId: number, objectEstimateId: number): Observable<ObjectEstimate[]> {
    let qb: SelectQueryBuilder<ObjectEstimateEntity>;
    qb = this.objectEstimateRepository
      .createQueryBuilder('object_estimate')
      .where('object_estimate.project_id = :project_id', { project_id: projectId });
    if (objectEstimateId) {
      qb = qb.andWhere('object_estimate.id = :object_estimate_id', { object_estimate_id: objectEstimateId });
    }
    return from(qb.getMany());
  }
}
