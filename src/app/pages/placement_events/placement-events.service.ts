import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';

//NOTE: the add placement events URL would have to be checked and changed later
@Injectable()
export class PlacementEventsService extends Api{
    private URL:string = this.getBaseUrl();

    addPlacementEvents(payload: any):Observable<any>{
        return this.http.post<any>(this.URL+'/placementevents/add-new-placement-event', payload)

    }
}