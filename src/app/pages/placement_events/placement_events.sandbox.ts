import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../app.state';
import * as PlacementEventsAction from './action/placement_events.action'
import  { addPlacementEvents, addPlacementEventsLoading,placementEventsList, placementEventsListLoading, updatePlacementEvent, updatePlacementEventLoading } from './reducer/placement_events.selector';

@Injectable()
export class PlacementEventsSandbox{
    public addPlacementEvents$;
    public addPlacementEventsLoading$;

    public placementEventsList$;
    public placementEventsListLoading$;
    
    public updatePlacementEvent$;
    public updatePlacementEventLoading$;

    constructor(protected appState: Store<store.AppState>){
        this.addPlacementEvents$ = this.appState.select(addPlacementEvents);
        this.addPlacementEventsLoading$ = this.appState.select(addPlacementEventsLoading);
        
        this.placementEventsList$ = this.appState.select(placementEventsList);
        this.placementEventsListLoading$ = this.appState.select(placementEventsListLoading);
        
        this.updatePlacementEvent$ = this.appState.select(updatePlacementEvent);
        this.updatePlacementEventLoading$ = this.appState.select(updatePlacementEventLoading);
    }

    public addPlacementEvents(params: any){
        this.appState.dispatch(new PlacementEventsAction.addPlacementEvents(params));
    }

    public placementEventsList(){
        this.appState.dispatch( new PlacementEventsAction.placementEventsList());

    }

    public updatePlacementEvent(params: any){
        this.appState.dispatch(new PlacementEventsAction.updatePlacementEvent(params));
    }
    


}