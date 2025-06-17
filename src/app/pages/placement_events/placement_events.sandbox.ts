import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../app.state';
import * as PlacementEventsAction from './action/placement_events.action'
import  { addPlacementEvents, addPlacementEventsLoading } from './reducer/placement_events.selector';

@Injectable()
export class PlacementEventsSandbox{
    public addPlacementEvents$;
    public addPlacementEventsLoading$;

    constructor(protected appState: Store<store.AppState>){
        this.addPlacementEvents$ = this.appState.select(addPlacementEvents);
        this.addPlacementEventsLoading$ = this.appState.select(addPlacementEventsLoading);
    }

    addPlacementEvents(params: any){
        this.appState.dispatch(new PlacementEventsAction.addPlacementEvents(params));
    }
}