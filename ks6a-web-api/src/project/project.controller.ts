import { Controller, Get, Query, Version } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ProjectService } from '@src/project/project.service';
import { Project } from '@src/dto';

@Controller('project')
export class ProjectController {
  constructor (private readonly projectService: ProjectService) {}

  @Version('1')
  @Get('get-projects')
  getProjects (): Observable<Project[]> {
    return this.projectService.getProjects();
  }

  @Version('1')
  @Get('get-project')
  getProject (
    @Query('projectId') projectId: number,
  ): Observable<Project> {
    return this.projectService.getProject(projectId);
  }
}
