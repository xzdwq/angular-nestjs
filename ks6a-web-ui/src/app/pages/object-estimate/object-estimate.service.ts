import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ObjectEstimate } from '@app/dto';
import { LoadMaskService } from '@cmp/load-mask/load-mask.service';
import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ObjectEstimateService {
  constructor (
    protected http: HttpClient,
    private loadMaskService: LoadMaskService,
    private messageMaskService: MessageMaskService,
  ) {}

  // Получаем объекты сметы для конкретного проекта
  fetchObjectEstimates (projectId: number): Observable<ObjectEstimate[]> {
    this.loadMaskService.setLoad(true);
    return this.http.get<ObjectEstimate[]>('/api/v1/object-estimate/get-object-estimates',
      {
        params: {
          projectId: projectId,
        },
      },
    )
      .pipe(
        map((res) => {
          if (!res.length)
            this.messageMaskService.setIsShowMsg({ subRaw: ObjectEstimateService.name });
          this.loadMaskService.setLoad(false);
          return res;
        }),
      );
  }

  fetchObjectEstimate (objectEstimateId: number): Observable<ObjectEstimate> {
    return this.http.get<ObjectEstimate>('/api/v1/object-estimate/get-object-estimate',
      {
        params: {
          objectEstimateId: objectEstimateId,
        },
      },
    );
  }

  resolve (route: ActivatedRouteSnapshot): Observable<ObjectEstimate> {
    const objectEstimateId = +route.params['objectEstimateId'];
    return this.fetchObjectEstimate(objectEstimateId);
  }
}
