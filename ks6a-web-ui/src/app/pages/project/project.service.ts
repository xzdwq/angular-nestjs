import { Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { Project } from '@app/dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor () {}

  // Получаем проекты
  loadProjects (): Observable<Project[]> {
    return from(ajax.get('/api/project/get-projects')
    .pipe(
      map((res: AjaxResponse<any>) => {
        return res.response;
      }),
      catchError(error => {
        return error;
      }),
    ));
  }
}
