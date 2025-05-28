import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class Api {

  constructor(protected  http: HttpClient) {

  }

  protected getBaseUrl(): string {
    return environment.baseUrl;
  }

}