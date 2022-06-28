import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ks6aItemController } from '@src/ks6a-item/ks6a-item.controller';
import { Ks6aItemService } from '@src/ks6a-item/ks6a-item.service';
import { Ks6aItemEntity, Ks6aPeriodEntity } from '@src/orm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ks6aItemEntity,
      Ks6aPeriodEntity,
    ]),
  ],
  controllers: [
    Ks6aItemController,
  ],
  providers: [
    Ks6aItemService,
  ],
})
export class Ks6aItemModule {}
