import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {ApiService} from "../api/api.service";
import {DataModel} from "../../models/data-model";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  data: WritableSignal<DataModel> = signal({months: []});

  constructor(private apiService: ApiService) {
  }

  loadData = (): void => {
    this.apiService.getData().subscribe({
      next: (res: DataModel) => {
        this.data.set(res);
      }
    })
  }


}
