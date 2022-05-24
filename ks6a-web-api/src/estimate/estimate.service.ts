import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Estimate } from '@src/dto';
import { EstimateEntity } from '@src/orm';

@Injectable()
export class EstimateService {
  constructor (
    @InjectRepository(EstimateEntity)
    private estimateRepository: Repository<EstimateEntity>,
  ) {}

  fetchEstimates (objectEstimateId: number): Observable<Estimate[]> {
    return from(this.estimateRepository.find({ objectEstimateId: objectEstimateId }));
  }

  fetchEstimate (estimateId: number): Observable<Estimate> {
    return from(this.estimateRepository.findOne({ id: estimateId}));
  }
}
