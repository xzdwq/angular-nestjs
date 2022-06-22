### Установка
`git clone <url> -b <branch>`

### Перед запуском
1. Создать схему в БД `req`;
2. Насторить конфигурацию подключения к БД;
3. Выполнить тестовые миграции `src/orm/migration/1639553582937-TestData.ts`

### Запуск
`npm run go`


### Other
```typescript
  import { SelectQueryBuilder } from 'typeorm';
  getData (objectEstimateId: number, estimateId: number): Observable<Type[]> {
    let qb: SelectQueryBuilder<Estimate>;
    qb = this.estimateRepository
      .createQueryBuilder('estimate')
      .where('estimate.object_estimate_id = :objectEstimateId', { objectEstimateId: objectEstimateId });
    if (+estimateId) {
      qb = qb.andWhere('estimate.id = :estimateId', { estimateId: estimateId });
    }
    return from(qb.getMany());
  }
```
