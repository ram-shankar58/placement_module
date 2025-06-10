import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';

@Injectable({
  providedIn: 'root'
})
export class AwsuploadService extends Api{

  private URL: string = this.getBaseUrl();


  ImgUpload(payload:any): Observable<any> {
    return this.http.post<any>(this.URL + "/add_asset", payload)
  }
}
