import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '@page/project/project.service';
import { Project } from '@app/dto';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  host: { 'class': 'h-full flex flex-col overflow-hidden' },
})
export class ProjectComponent implements OnInit {
  public projectId!: number;
  public projects: Project[] = [];
  public tabIndex: number = 0;
  public isShowMsg: boolean = false;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
  ) {}

  ngOnInit (): void {
    this.route.firstChild?.params
      .subscribe(params => {
        this.projectId = +params['projectId'];
        this.projectService.fetchProjects()
          .subscribe({
            next: (projects) => {
              this.projects = projects;
              this.isShowMsg = !this.projects.length ? true : false;
              this.checkProject();
            },
            error: () => this.isShowMsg = true,
          });
      });
  }

  tabClick (tabIndex: number): void {
    this.tabIndex = tabIndex;
    this.checkProject(tabIndex);
  }

  checkProject (tabIndex: number = -1): void {
    if (this.projects.length && this.projectId) {
      let findProjectIndex = tabIndex >= 0
        ? tabIndex
        : this.projects.findIndex((i: Project) => i.id === this.projectId);
      this.tabIndex = findProjectIndex;
      if (tabIndex >= 0) this.router.navigate([`${this.projects[this.tabIndex].id}`], { relativeTo: this.route });
    }
  }

}
