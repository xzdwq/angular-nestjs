import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { LoadMaskService } from '@cmp/load-mask/load-mask.service';
import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
import { Ks6aItem, Period } from '@app/dto';

@Injectable({
  providedIn: 'root',
})
export class Ks6aItemService {
  constructor (
    protected http: HttpClient,
    private loadMaskService: LoadMaskService,
    private messageMaskService: MessageMaskService,
  ) {}

  // Получаем список КС-6а для конкретной сметы
  fetchKs6aItems (estimateId: number): Observable<{ ks6aItems: Ks6aItem[], periods: Period[] }> {
    this.loadMaskService.setLoad(true);
    return this.http.get<{ ks6aItems: Ks6aItem[], periods: Period[] }>('/api/v1/ks6a-item/get-ks6a-items',
      {
        params: {
          estimateId: estimateId,
        },
      },
    )
      .pipe(
        map((res) => {
          if (!res.ks6aItems.length)
            this.messageMaskService.setIsShowMsg({ subRaw: Ks6aItemService.name });
          this.loadMaskService.setLoad(false);
          return res;
        }),
      );
  }

  fetchKs6aItem (ks6aItemId: number ): Observable<Ks6aItem> {
    return this.http.get<Ks6aItem>('/api/v1/ks6a-item/get-ks6a-item',
      {
        params: {
          ks6aItemId: ks6aItemId,
        },
      },
    );
  }
}
