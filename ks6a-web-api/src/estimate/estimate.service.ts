import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Estimate } from '@src/dto';
import { EstimateEntity } from '@src/orm';

@Injectable()
export class EstimateService {
  constructor (
    @InjectRepository(EstimateEntity)
    private estimateRepository: Repository<EstimateEntity>,
  ) {}

  getEstimates (objectEstimateId: number, estimateId: number): Observable<Estimate[]> {
    let qb: SelectQueryBuilder<Estimate>;
    qb = this.estimateRepository
      .createQueryBuilder('estimate')
      .where('estimate.object_estimate_id = :objectEstimateId', { objectEstimateId: objectEstimateId });
    if (+estimateId) {
      qb = qb.andWhere('estimate.id = :estimateId', { estimateId: estimateId });
    }
    return from(qb.getMany());
  }
}
