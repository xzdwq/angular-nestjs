import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from '@src/project/project.controller';
import { ProjectService } from '@src/project/project.service';
import { ProjectEntity } from '@src/orm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
    ]),
  ],
  controllers: [
    ProjectController,
  ],
  providers: [
    ProjectService,
  ],
})
export class ProjectModule {}
