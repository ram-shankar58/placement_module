import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';

//NOTE: the add placement events URL would have to be checked and changed later
@Injectable()
export class CareerTrainingsService extends Api{
    private URL:string = this.getBaseUrl();

    addCareerTraining(payload: any):Observable<any>{
        console.log('payload', payload);
        return this.http.post<any>(this.URL+'/careertraining/add-career-training', payload)

    }

    careerTrainingsList(): Observable<any> {
        return this.http.get<any>(this.URL+'/careertraining/get-career-training')
    }
    updateCareerTraining(payload: any): Observable<any> {
        console.log('payload', payload);
        return this.http.put<any>(this.URL+'/careertraining/update-career-training', payload)
    }
    deleteCareerTraining(payload: any): Observable<any>{
        console.log('payload', payload);
        return this.http.delete<any>(this.URL+'/careertraining/delete-career/'+payload.id, payload)
    }

}