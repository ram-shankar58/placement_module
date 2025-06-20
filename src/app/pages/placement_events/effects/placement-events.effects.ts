import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import * as PlacementEventsAction from '../action/placement_events.action';
import { PlacementEventsService } from '../placement-events.service';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class PlacementEventsEffect implements OnDestroy{
    private subscriptions: Subscription = new Subscription();

    constructor(private actions$: Actions, protected placementEventsService: PlacementEventsService, public router:Router, private store: Store, private Router: Router){
        //Adding events
        this.subscriptions.add(
            this.actions$.pipe(
                ofType(PlacementEventsAction.ActionTypes.ADD_PLACEMENT_EVENTS), 
                map((action: PlacementEventsAction.addPlacementEvents) => action.payload), 
                switchMap((state: any) =>
                    this.placementEventsService.addPlacementEvents(state).pipe(
                        map((result:any) => new PlacementEventsAction.addPlacementEventsSuccess(result)),
                        catchError(error => of(new PlacementEventsAction.addPlacementEventsFail(error.error)))
                    ))
                
            ).subscribe((action: any) => {
                this.store.dispatch(action)
            })
        );

        this.subscriptions.add(
            this.actions$.pipe(
                ofType(PlacementEventsAction.ActionTypes.PLACEMENT_EVENTS_LIST),
                map((action: PlacementEventsAction.placementEventsList) => action),
                switchMap(() => this.placementEventsService.placementEventsList().pipe(
                    map((result:any) => new PlacementEventsAction.placementEventsListSuccess(result)),
                    catchError(error => of(new PlacementEventsAction.placementEventsListFail(error.error)))
                ))
            ).subscribe((action: any) =>{
                this.store.dispatch(action)
            })
        );

        //update placement event
        this.subscriptions.add(
            this.actions$.pipe(
                ofType(PlacementEventsAction.ActionTypes.UPDATE_PLACEMENT_EVENT),
                map((action: PlacementEventsAction.updatePlacementEvent) => action.payload),
                switchMap((state: any) =>
                    this.placementEventsService.updatePlacementEvent(state).pipe(
                            map((result: any) => new PlacementEventsAction.updatePlacementEventSuccess(result)),
                            catchError(error => of(new PlacementEventsAction.updatePlacementEventFail(error.error))
                    ))
            )
            ).subscribe((action: any) =>{
                this.store.dispatch(action)
            }
        )
    )
    }
    ngOnDestroy(){
        this.subscriptions.unsubscribe();
    }
}