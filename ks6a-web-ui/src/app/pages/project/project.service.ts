import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
import { Project } from '@app/dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor (
    protected http: HttpClient,
    private messageMaskService: MessageMaskService,
  ) {}

  // Получаем проекты
  loadProjects (): Observable<Project[]> {
    return this.http.get<Project[]>('/api/v1/project/get-projects')
      .pipe(
        map((res) => {
          if (!res.length)
            this.messageMaskService.setIsShowMsg({ subRaw: ProjectService.name });
          return res;
        }),
      );
  }
}
