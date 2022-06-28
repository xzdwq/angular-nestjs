import { Injectable } from '@nestjs/common';
import { from, Observable, switchMap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

import { Ks6aItemEntity, Ks6aPeriodEntity } from '@src/orm';
import { Ks6aItem, AddKs6aPeriod, UpdateKs6aPeriod, Ks6aPeriods } from '@src/dto';

@Injectable()
export class Ks6aItemService {
  constructor (
    @InjectRepository(Ks6aItemEntity)
    private ks6aItemRepository: Repository<Ks6aItemEntity>,
    @InjectRepository(Ks6aPeriodEntity)
    private ks6aIPeriodRepository: Repository<Ks6aPeriodEntity>,
  ) {}

  fetchKs6aItems (estimateId: number): Observable<Ks6aItem[]> {
    const ks6aItems = this.ks6aItemRepository.find({
      join: {
        alias: 'ks6a_item',
        leftJoinAndSelect: {
          executions: 'ks6a_item.executions',
          ks6a: 'ks6a_item.ks6a',
          ks6aPeriods: 'ks6a.ks6aPeriods',
          periodType: 'ks6aPeriods.periodType',
        },
      },
      where: (qb: SelectQueryBuilder<Ks6aItem>) => {
        qb.where({
          estimateId: estimateId,
        })
        .andWhere('executions.ks6a_item_contractor_id IS NULL')
        .orderBy('ks6aPeriods.period_timestamp', 'ASC');
      },
      order: {
        createDate: 'ASC',
      },
    });
    return from(ks6aItems);
  }

  fetchKs6aItem (ks6aItemId: number): Observable<Ks6aItem> {
    return from(this.ks6aItemRepository.findOne({ id: ks6aItemId}));
  }

  addKs6aPeriod (addParams: AddKs6aPeriod): Observable<Ks6aItem[]> {
    return from(this.ks6aIPeriodRepository.save({
      periodDate: new Date,
      ks6aId: addParams.ks6aId,
      periodTypeId: 1, // Выполнение
    }))
    .pipe(
      switchMap(() => this.fetchKs6aItems(addParams.estimateId)),
    );
  }

  updateKs6aPeriod (updateParams: UpdateKs6aPeriod): Observable<Ks6aPeriods> {
    return from(this.ks6aIPeriodRepository.update(
      { id: updateParams.ks6aPeriodId },
      { periodDate: updateParams.newPeriod },
    ))
    .pipe(
      switchMap(() => this.ks6aIPeriodRepository.findOne(updateParams.ks6aPeriodId)),
    );
  }

  deleteKs6aPeriod (ks6aPeriodId: number): Observable<DeleteResult> {
    return from(this.ks6aIPeriodRepository.delete(ks6aPeriodId));
  }
}
