import { Injectable } from '@nestjs/common';
import { forkJoin, from, map, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ks6aItem, Period } from '@src/dto';
import { Ks6aItemEntity } from '@src/orm';

@Injectable()
export class Ks6aItemService {
  constructor (
    @InjectRepository(Ks6aItemEntity)
    private ks6aItemRepository: Repository<Ks6aItemEntity>,
  ) {}

  fetchKs6aItems (estimateId: number): Observable<{ ks6aItems: Ks6aItem[]; periods: Period[] }> {
    const ks6aItems = this.ks6aItemRepository.find({ estimateId: estimateId });
    const periods = this.ks6aItemRepository
      .createQueryBuilder('ks6a_item')
      .leftJoinAndSelect('ks6a_item.execution', 'execution')
      .select(['ks6a_item.id', 'execution.periodDate', 'execution.volume'])
      .distinct(true)
      .where('ks6a_item.estimateId = :estimateId', { estimateId: estimateId })
      .andWhere('execution.periodDate NOTNULL')
      .orderBy('execution.periodDate', 'ASC')
      .getMany();

    const result = forkJoin({
      ks6aItems: ks6aItems,
      periods: periods,
    })
    .pipe(
      map((val) => {
        // Ищем вхождение остатков в периоды
        const executionMap = val.periods.flatMap((p) => p.execution.map((e) => { return { ks6aItemId: p.id, period: e.periodDate, volume: e.volume }}));

        // Ищем итоги по периоду
        const remindeMap = val.ks6aItems.flatMap((k) => k.remainder.map((r) => {
          // Все вхождния в имеющиеся года/Итоги за все периоды (total)
          const executionMapYear = executionMap.find((ey) => r.year === new Date(ey.period).getFullYear().toString() || r.type === 'total' );
          return executionMapYear
            ? {
                year: r.year,
                period: new Date(+r.year, 11, 31),
                ks6aItemId: executionMapYear.ks6aItemId,
                type: r.type,
                volume: executionMapYear.volume,
                reminder: r.volume,
              }
            : null;
        }));

        // Добавляем итоги остатков в общий массив периодов
        const concatPeriod = executionMap.concat(remindeMap.filter(Boolean)).slice().sort((a, b) => {
          const bP = new Date(b.period);
          const aP = new Date(a.period);
          return bP > aP ? -1 : bP < aP ? 1 : 0;
        });

        return {
          ks6aItems: val.ks6aItems,
          periods: concatPeriod,
        }
      }),
    );

    return result;
  }

  fetchKs6aItem (ks6aItemId: number): Observable<Ks6aItem> {
    return from(this.ks6aItemRepository.findOne({ id: ks6aItemId}));
  }
}
