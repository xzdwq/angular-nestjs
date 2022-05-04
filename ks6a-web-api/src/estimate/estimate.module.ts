import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstimateController } from '@src/estimate/estimate.controller';
import { EstimateService } from '@src/estimate/estimate.service';
import { EstimateEntity } from '@src/orm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstimateEntity,
    ]),
  ],
  controllers: [ EstimateController ],
  providers: [ EstimateService ],
})
export class EstimateModule {}
