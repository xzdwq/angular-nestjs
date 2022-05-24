import { Controller, Get, Query, Version } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ProjectService } from '@src/project/project.service';
import { Project } from '@src/dto';

@Controller('project')
export class ProjectController {
  constructor (private readonly projectService: ProjectService) {}

  @Version('1')
  @Get('get-projects')
  fetchProjects (): Observable<Project[]> {
    return this.projectService.fetchProjects();
  }

  @Version('1')
  @Get('get-project')
  fetchProject (
    @Query('projectId') projectId: number,
  ): Observable<Project> {
    return this.projectService.fetchProject(projectId);
  }
}
