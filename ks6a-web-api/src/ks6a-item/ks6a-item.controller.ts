import { Controller, Get, Query, Version } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Ks6aItemService } from '@src/ks6a-item/ks6a-item.service';
import { Ks6aItem, Period } from '@src/dto';

@Controller('ks6a-item')
export class Ks6aItemController {
  constructor (private readonly ks6aItemService: Ks6aItemService) {}

  @Version('1')
  @Get('get-ks6a-items')
  fetchKs6aItems (
    @Query('estimateId') estimateId: number,
  ): Observable<{ ks6aItems: Ks6aItem[]; periods: Period[] }> {
    return this.ks6aItemService.fetchKs6aItems(estimateId);
  }

  @Version('1')
  @Get('get-ks6a-item')
  fetchKs6aItem (
    @Query('ks6aItemId') ks6aItemId: number,
  ): Observable<Ks6aItem> {
    return this.ks6aItemService.fetchKs6aItem(ks6aItemId);
  }
}
