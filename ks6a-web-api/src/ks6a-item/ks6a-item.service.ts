import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Ks6aItem } from '@src/dto';
import { Ks6aItemEntity } from '@src/orm';

@Injectable()
export class Ks6aItemService {
  constructor (
    @InjectRepository(Ks6aItemEntity)
    private ks6aItemRepository: Repository<Ks6aItemEntity>,
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
}
