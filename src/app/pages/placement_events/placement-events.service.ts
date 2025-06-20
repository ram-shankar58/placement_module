import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';

//NOTE: the add placement events URL would have to be checked and changed later
@Injectable()
export class PlacementEventsService extends Api{
    private URL:string = this.getBaseUrl();

    addPlacementEvents(payload: any):Observable<any>{
        console.log('payload', payload);
        return this.http.post<any>(this.URL+'/placementevents/add-new-placement-event', payload)

    }

    placementEventsList(): Observable<any> {
        return this.http.get<any>(this.URL+'/placementevents/get-placement-events')
    }
    updatePlacementEvent(payload: any): Observable<any> {
        console.log('payload', payload);
        return this.http.put<any>(this.URL+'/placementevents/update-placement-event', payload)
    }

}