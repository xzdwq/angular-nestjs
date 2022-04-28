import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ObjectEstimate } from '@app/dto';
import { OBJECT_ESTIMATES } from '@app/mock/data';
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
    const estimateForProject = OBJECT_ESTIMATES.filter((i: ObjectEstimate) => i.projectId === projectId);
    this.loadMaskService.setLoad(false);
    return of(estimateForProject);
  }
}
