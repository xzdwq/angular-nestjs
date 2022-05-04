import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ObjectEstimate } from '@src/dto';
import { ObjectEstimateEntity } from '@src/orm';

@Injectable()
export class ObjectEstimateService {
  constructor (
    @InjectRepository(ObjectEstimateEntity)
    private objectEstimateRepository: Repository<ObjectEstimateEntity>,
  ) {}

  getObjectEstimates (projectId: string): Observable<ObjectEstimate[]> {
    return from(this.objectEstimateRepository.find({ where: { projectId: projectId } }));
  }
}
