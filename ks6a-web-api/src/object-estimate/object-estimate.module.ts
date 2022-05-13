import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ObjectEstimateController } from '@src/object-estimate/object-estimate.controller';
import { ObjectEstimateService } from '@src/object-estimate/object-estimate.service';
import { ObjectEstimateEntity } from '@src/orm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ObjectEstimateEntity,
    ]),
  ],
  controllers: [
    ObjectEstimateController,
  ],
  providers: [
    ObjectEstimateService,
  ],
})
export class ObjectEstimateModule {}
