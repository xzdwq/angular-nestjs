import { Controller, Get, Query, Version } from '@nestjs/common';
import { Observable } from 'rxjs';

import { EstimateService } from '@src/estimate/estimate.service';
import { Estimate } from '@src/dto';

@Controller('estimate')
export class EstimateController {
  constructor (private readonly estimateService: EstimateService) {}

  @Version('1')
  @Get('get-estimates')
  fetchEstimates (
    @Query('objectEstimateId') objectEstimateId: number,
  ): Observable<Estimate[]> {
    return this.estimateService.fetchEstimates(objectEstimateId);
  }

  @Version('1')
  @Get('get-estimate')
  fetchEstimate (
    @Query('estimateId') estimateId: number,
  ): Observable<Estimate> {
    return this.estimateService.fetchEstimate(estimateId);
  }
}
