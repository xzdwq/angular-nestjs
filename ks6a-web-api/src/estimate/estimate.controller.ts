import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { EstimateService } from '@src/estimate/estimate.service';
import { Estimate } from '@src/dto';

@Controller('estimate')
export class EstimateController {
  constructor(private readonly estimateService: EstimateService) {}

  @Get('get-estimates')
  getEstimates(
    @Query('objectEstimateId') objectEstimateId: string,
  ): Observable<Estimate[]> {
    return this.estimateService.getEstimates(objectEstimateId);
  }
}
