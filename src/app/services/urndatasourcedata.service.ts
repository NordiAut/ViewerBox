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

}
