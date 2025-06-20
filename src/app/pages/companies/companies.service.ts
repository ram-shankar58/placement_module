import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';
import { ResponseInterface } from '../../shared/interfaces/interface';

@Injectable()
export class CompaniesService extends Api {

  private URL: string = this.getBaseUrl();

  //add companies
  addCompanies(payload: any): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(this.URL + '/company/add-new-company', payload)

  }

  //companiesList
  companiesList(): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(this.URL + "/company/get-companies")
  }

  //updateCompany
  updateCompany(payload: any): Observable<ResponseInterface> {
    return this.http.put<ResponseInterface>(this.URL + "/company/update-company", payload)
  }

  //archiveCompany
  archiveCompany(payload:any): Observable<ResponseInterface> {
    console.log('payload',payload);
    const id = payload.id;
    return this.http.put<ResponseInterface>(this.URL + '/company/archive-company/' + id, {});
  } 

}
