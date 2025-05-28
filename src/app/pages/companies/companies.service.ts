import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';

@Injectable()
export class CompaniesService extends Api{

  private URL:string = this.getBaseUrl();

  //add companies
  addCompanies(payload: any):Observable<any>{
    console.log('service',payload);
    return this.http.post<any>(this.URL + 'companies/add-company',payload)
  }
}
