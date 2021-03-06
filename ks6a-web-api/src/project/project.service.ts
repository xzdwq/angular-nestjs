import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from '@src/dto';
import { ProjectEntity } from '@src/orm';

@Injectable()
export class ProjectService {
  constructor (
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  fetchProjects (): Observable<Project[]> {
    return from(this.projectRepository.find());
  }

  fetchProject (projectId: number): Observable<Project> {
    return from(this.projectRepository.findOne({ id: projectId }));
  }
}
