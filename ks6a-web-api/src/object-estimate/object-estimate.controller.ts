import { Controller, Get, Query, Version } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ObjectEstimateService } from '@src/object-estimate/object-estimate.service';
import { ObjectEstimate } from '@src/dto';

@Controller('object-estimate')
export class ObjectEstimateController {
  constructor (private readonly objectEstimateService: ObjectEstimateService) {}

  @Version('1')
  @Get('get-object-estimates')
  fetchObjectEstimates (
    @Query('projectId') projectId: number,
  ): Observable<ObjectEstimate[]> {
    return this.objectEstimateService.fetchObjectEstimates(projectId);
  }

  @Version('1')
  @Get('get-object-estimate')
  fetchObjectEstimate (
    @Query('objectEstimateId') objectEstimateId: number,
  ): Observable<ObjectEstimate> {
    return this.objectEstimateService.fetchObjectEstimate(objectEstimateId);
  }
}
