import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Estimate } from '@app/dto';
import { LoadMaskService } from '@cmp/load-mask/load-mask.service';
import { MessageMaskService } from '@cmp/message-mask/message-mask.service';

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
  loadEstimates (objectEstimateId: number): Observable<Estimate[]> {
    this.loadMaskService.setLoad(true);
    return this.http.get<Estimate[]>('/api/estimate/get-estimates',
      {
        params: {
          objectEstimateId: objectEstimateId,
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
}
