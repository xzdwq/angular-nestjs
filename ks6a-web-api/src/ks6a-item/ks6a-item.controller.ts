import { Body, Controller, Delete, Get, Param, Post, Put, Query, Version } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Observable } from 'rxjs';

import { Ks6aItemService } from '@src/ks6a-item/ks6a-item.service';
import { Ks6aItem, AddKs6aPeriod, UpdateKs6aPeriod, Ks6aPeriods } from '@src/dto';

@Controller('ks6a-item')
export class Ks6aItemController {
  constructor (private readonly ks6aItemService: Ks6aItemService) {}

  @Version('1')
  @Get('get-ks6a-items')
  fetchKs6aItems (
    @Query('estimateId') estimateId: number,
  ): Observable<Ks6aItem[]> {
    return this.ks6aItemService.fetchKs6aItems(estimateId);
  }

  @Version('1')
  @Get('get-ks6a-item')
  fetchKs6aItem (
    @Query('ks6aItemId') ks6aItemId: number,
  ): Observable<Ks6aItem> {
    return this.ks6aItemService.fetchKs6aItem(ks6aItemId);
  }

  @Version('1')
  @Post('add-ks6a-period')
  addKs6aPeriod (
    @Body() addParams: AddKs6aPeriod,
  ): Observable<Ks6aItem[]> {
    return this.ks6aItemService.addKs6aPeriod(addParams);
  }

  @Version('1')
  @Put('update-ks6a-period')
  updateKs6aPeriod (
    @Body() updateParams: UpdateKs6aPeriod,
  ): Observable<Ks6aPeriods> {
    return this.ks6aItemService.updateKs6aPeriod(updateParams);
  }

  @Version('1')
  @Delete('delete-ks6a-period/:ks6aPeriodId')
  deleteKs6aPeriod (
    @Param() params: { ks6aPeriodId: number },
  ): Observable<DeleteResult> {
    return this.ks6aItemService.deleteKs6aPeriod(params.ks6aPeriodId);
  }
}
