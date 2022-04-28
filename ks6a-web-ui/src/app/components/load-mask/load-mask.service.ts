import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoadMaskService {
  public isLoading = new BehaviorSubject<boolean>(false);
  constructor () {}

  getLoad (): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setLoad (isLoad: boolean): void {
    this.isLoading.next(isLoad);
  }
}
