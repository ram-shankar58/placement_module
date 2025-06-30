import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { CareerTrainingsService } from '../career_trainings.service';
import * as CareerTrainingsAction from '../action/career_trainings.action';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class CareerTrainingsEffect implements OnDestroy{
    private subscriptions: Subscription = new Subscription();

    constructor(private actions$: Actions, protected careerTrainingsService: CareerTrainingsService, public router:Router, private store: Store, private Router: Router){
        //Adding events
        this.subscriptions.add(
            this.actions$.pipe(
                ofType(CareerTrainingsAction.ActionTypes.ADD_CAREER_TRAINING), 
                map((action: CareerTrainingsAction.addCareerTraining) => action.payload), 
                switchMap((state: any) =>
                    this.careerTrainingsService.addCareerTraining(state).pipe(
                        map((result:any) => new CareerTrainingsAction.addCareerTrainingSuccess(result)),
                        catchError(error => of(new CareerTrainingsAction.addCareerTrainingFail(error.error)))
                    ))
                
            ).subscribe((action: any) => {
                this.store.dispatch(action)
            })
        );

        this.subscriptions.add(
            this.actions$.pipe(
                ofType(CareerTrainingsAction.ActionTypes.CAREER_TRAININGS_LIST),
                map((action: CareerTrainingsAction.careerTrainingsList) => action),
                switchMap(() => this.careerTrainingsService.careerTrainingsList().pipe(
                    map((result:any) => new CareerTrainingsAction.careerTrainingsListSuccess(result)),
                    catchError(error => of(new CareerTrainingsAction.careerTrainingsListFail(error.error)))
                ))
            ).subscribe((action: any) =>{
                this.store.dispatch(action)
            })
        );

        //update placement event
        this.subscriptions.add(
            this.actions$.pipe(
                ofType(CareerTrainingsAction.ActionTypes.UPDATE_CAREER_TRAINING),
                map((action: CareerTrainingsAction.updateCareerTraining) => action.payload),
                switchMap((state: any) =>
                    this.careerTrainingsService.updateCareerTraining(state).pipe(
                            map((result: any) => new CareerTrainingsAction.updateCareerTrainingSuccess(result)),
                            catchError(error => of(new CareerTrainingsAction.updateCareerTrainingFail(error.error))
                    ))
            )
            ).subscribe((action: any) =>{
                this.store.dispatch(action)
            }
        )
    )
    //deletion
    this.subscriptions.add(
        this.actions$.pipe(
            ofType(CareerTrainingsAction.ActionTypes.DELETE_CAREER_TRAINING),
            map((action: CareerTrainingsAction.deleteCareerTraining) => action.payload),
            switchMap((state: any) =>
            this.careerTrainingsService.deleteCareerTraining(state).pipe(
                map((result: any) => new CareerTrainingsAction.deleteCareerTrainingSuccess(result)),
                catchError(error => of(new CareerTrainingsAction.deleteCareerTrainingFail(error.error)))
            ))
        ).subscribe((action: any) => {
            this.store.dispatch(action);
        })
    );
    }
    ngOnDestroy(){
        this.subscriptions.unsubscribe();
    }
}