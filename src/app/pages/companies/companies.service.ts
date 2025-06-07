import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';

@Injectable()
export class CompaniesService extends Api{

  private URL:string = this.getBaseUrl();

  //add companies
  addCompanies(payload: any):Observable<any>{
    return this.http.post<any>(this.URL + '/company/add-new-company',payload)
  }

  //companiesList
  companiesList(): Observable<any>{
    return this.http.get<any>(this.URL + "/company/get-companies")
  }

  //updateCompany
  updateCompany(payload:any):Observable<any>{
    return this.http.put<any>(this.URL + "/company/update-company",payload)
  }
}
