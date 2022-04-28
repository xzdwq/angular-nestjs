import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Estimate } from '@app/dto';
import { ESTIMATES } from '@app/mock/data';
import { LoadMaskService } from '@cmp/load-mask/load-mask.service';

@Injectable({
  providedIn: 'root',
})
export class EstimateService {
  constructor (
    private loadMaskService: LoadMaskService,
  ) {}

  // Получаем сметы для конкретного объекта сметы
  loadEstimates (objectEstimateId: number): Observable<Estimate[]> {
    this.loadMaskService.setLoad(true);
    const estimateForObjectEstimate = ESTIMATES.filter((i: Estimate) => i.objectEstimateId === objectEstimateId);
    this.loadMaskService.setLoad(false);
    return of(estimateForObjectEstimate);
  }
}
