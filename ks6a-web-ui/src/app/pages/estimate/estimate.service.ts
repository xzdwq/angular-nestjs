import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';

import { LoadMaskService } from '@cmp/load-mask/load-mask.service';
import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
import { Estimate } from '@app/dto';

@Injectable({
  providedIn: 'root',
})
export class EstimateService {
  constructor (
    protected http: HttpClient,
    private loadMaskService: LoadMaskService,
    private messageMaskService: MessageMaskService,
  ) {}

  // Получаем сметы для конкретного объекта сметы
  loadEstimates (objectEstimateId: number, estimateId = 0): Observable<Estimate[]> {
    this.loadMaskService.setLoad(true);
    return this.http.get<Estimate[]>('/api/v1/estimate/get-estimates',
      {
        params: {
          objectEstimateId: objectEstimateId,
          estimateId: estimateId,
        },
      },
    )
      .pipe(
        map((res) => {
          if (!res.length)
            this.messageMaskService.setIsShowMsg({ subRaw: EstimateService.name });
          this.loadMaskService.setLoad(false);
          return res;
        }),
      );
  }

  getEstimate (objectEstimateId: number, estimateId: number ): Observable<Estimate[]> {
    return this.loadEstimates(objectEstimateId, estimateId)
      .pipe(
        map((estimate) => estimate),
      );
  }

  resolve (route: ActivatedRouteSnapshot): Observable<Estimate[]> {
    const objectEstimateId = +route.params['objectEstimateId'];
    const estimateId = +route.params['estimateId'] || 0;
    return this.getEstimate(objectEstimateId, estimateId);
  }
}
