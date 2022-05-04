import { Controller, Get, Query, Version } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ObjectEstimateService } from '@src/object-estimate/object-estimate.service';
import { ObjectEstimate } from '@src/dto';

@Controller('object-estimate')
export class ObjectEstimateController {
  constructor (private readonly objectEstimateService: ObjectEstimateService) {}

  @Version('1')
  @Get('get-object-estimates')
  getObjectEstimates (
    @Query('projectId') projectId: string,
  ): Observable<ObjectEstimate[]> {
    return this.objectEstimateService.getObjectEstimates(projectId);
  }
}
