import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URNSourceModel } from '../shared/URNSourceModel';

@Injectable({
  providedIn: 'root'
})
export class UrndatasourcedataService {

  private url = `https://localhost:5001/api/URNSourceModel`;

  constructor(private readonly http: HttpClient) { }

  getAllUrn(): any{
    return this.http.get<URNSourceModel[]>(this.url);
  }

  getSingleUrn(urnSourceModelId: number): any{
    return this.http.get<URNSourceModel>(`${this.url}/${urnSourceModelId}`);
  }

  addUrn(urnSourceModel: URNSourceModel): any {
    return this.http.post<URNSourceModel>(this.url, urnSourceModel);
  }

  deleteUrn(urnSourceModelId: number): any{
    return this.http.delete(this.url + '/' + urnSourceModelId);
  }

}
