### Установка
`git clone <url> -b <branch>`

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
