import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
import { ProjectService } from '@page/project/project.service';
import { Project } from '@app/dto';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  host: { 'class': 'h-full flex flex-col overflow-hidden' },
})
export class ProjectComponent implements OnInit {
  public projectId!: number;
  public objectEstimateId!: number;
  public projects: Project[] = [];
  public tabIndex: number = 0;
  public isShowMsg: boolean = false;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private messageMaskService: MessageMaskService,
    private projectService: ProjectService,
  ) {}

  ngOnInit (): void {
    this.route?.firstChild?.params
      .subscribe(params => {
        this.projectId = +params['projectId'];
        this.objectEstimateId = +params['objectEstimateId'];
      },
    );
    this.projectService.loadProjects()
      .subscribe({
        next: (projects) => {
          this.projects = projects;
          if (!this.projects.length) {
            this.messageMaskService.setIsShowMsg({ subRaw: ProjectComponent.name });
            this.isShowMsg = true;
          } else {
            this.isShowMsg = false;
          }
          this.checkProjectLocalStorage();
        },
        error: (err) => {
          this.messageMaskService.setIsShowMsg({ type: 'danger', msgRaw: err.message, subRaw: ProjectComponent.name });
          this.isShowMsg = true;
        },
      });
  }

  tabClick (tabIndex: number): void {
    this.tabIndex = tabIndex;
    this.checkProjectLocalStorage(tabIndex);
  }

  checkProjectLocalStorage (tabIndex: number = -1): void {
    if (this.projects.length) {
      if (!this.projectId) {
        const projectTabIndexLocalStorage = localStorage.getItem('projectTabIndex');
        if (!JSON.parse(projectTabIndexLocalStorage || '')) {
          localStorage.setItem('projectTabIndex', `${this.tabIndex}`);
        }
        let projectTabIndex =
          !projectTabIndexLocalStorage ? this.tabIndex : +projectTabIndexLocalStorage;
        if (projectTabIndex > this.projects.length - 1 || projectTabIndex < 0) {
          projectTabIndex = 0;
          localStorage.setItem('projectTabIndex', `${projectTabIndex}`);
        }
        this.router.navigate([`/project/${this.projects[projectTabIndex].id}`]);
        this.tabIndex = projectTabIndex;
      } else {
        let projectTabIndex = this.tabIndex,
          findProjectIndex;
        if (tabIndex >= 0) {
          findProjectIndex = tabIndex
        } else {
          findProjectIndex = this.projects.findIndex((i: Project) => i.id === this.projectId);
        }
        if (findProjectIndex !== -1) projectTabIndex = findProjectIndex;
        localStorage.setItem('projectTabIndex', `${projectTabIndex}`);
        this.router.navigate([
          `/project/${
            !this.objectEstimateId || this.objectEstimateId == 0
              ? this.projects[projectTabIndex].id
              : this.projects[projectTabIndex].id+'/'+this.objectEstimateId
          }`,
        ]);
        this.objectEstimateId = 0;
        this.tabIndex = projectTabIndex;
      }
    } else {
      this.router.navigate([`/project/0`]);
      this.tabIndex = 0;
    }
  }

}
