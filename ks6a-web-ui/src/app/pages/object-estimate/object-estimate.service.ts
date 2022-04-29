import { Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { ObjectEstimate } from '@app/dto';
import { LoadMaskService } from '@cmp/load-mask/load-mask.service';

@Injectable({
  providedIn: 'root',
})
export class ObjectEstimateService {
  constructor (
    private loadMaskService: LoadMaskService,
  ) {}

  // Получаем объекты сметы для конкретного проекта
  loadObjectEstimates (projectId: number): Observable<ObjectEstimate[]> {
    this.loadMaskService.setLoad(true);
    return from(ajax.get(`/api/object-estimate/get-object-estimates?projectId=${projectId}`)
    .pipe(
      map((res: AjaxResponse<any>) => {
        this.loadMaskService.setLoad(false);
        return res.response;
      }),
      catchError(error => {
        this.loadMaskService.setLoad(false);
        throw new Error(error.status + ' - ' + error.request.url + ': ' + error.message);
      }),
    ));
  }
}
