import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataModel} from "../../models/data-model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  getData = () => {
    return this.httpClient.get<DataModel>('./assets/data/data.json');
  }

}
