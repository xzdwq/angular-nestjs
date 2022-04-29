import { Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { Estimate } from '@app/dto';
import { LoadMaskService } from '@cmp/load-mask/load-mask.service';

@Injectable({
  providedIn: 'root',
})
export class EstimateService {
  constructor (
    private loadMaskService: LoadMaskService,
  ) {}

  // Получаем сметы для конкретного объекта сметы
  loadEstimates (objectEstimateId: string): Observable<Estimate[]> {
    this.loadMaskService.setLoad(true);
    return from(ajax.get(`/api/estimate/get-estimates?objectEstimateId=${objectEstimateId}`)
    .pipe(
      map((res: AjaxResponse<any>) => {
        this.loadMaskService.setLoad(false);
        return res.response;
      }),
      catchError(error => {
        this.loadMaskService.setLoad(false);
        return error;
      }),
    ));
  }
}
