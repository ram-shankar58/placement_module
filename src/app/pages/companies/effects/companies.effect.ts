import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CompaniesService } from '../companies.service';
import * as actions  from '../action/companies.action';
import { of, Subscription} from 'rxjs'
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class CompaniesEffect implements OnDestroy{

    private subscriptions: Subscription = new Subscription();

        constructor(
        private action$: Actions,
        protected companiesservice: CompaniesService,
        public router: Router,
        private store: Store,
        private Router: Router
    ) 
    {

        //add Companies
        this.subscriptions.add(
            this.action$.pipe(
                ofType(actions.ActionTypes.ADD_COMPANIES),
                map((action: actions.addCompanies) => action.payload),
                switchMap((state: any) =>
                    this.companiesservice.addCompanies(state).pipe(
                        map((result: any) => new actions.addCompaniesSuccess(result)),
                        catchError(error => of(new actions.addCompaniesFail(error.error)))
                    )
                )
            ).subscribe((action: any) => {
                this.store.dispatch(action)
            })
        );

        //companiesList
        this.subscriptions.add(
            this.action$.pipe(
                ofType(actions.ActionTypes.COMPANIES_LIST),
                map((action: actions.companiesList) => action),
                switchMap(() => 
                this.companiesservice.companiesList().pipe(
                    map((result:any) => new actions.companiesListSuccess(result)),
                    catchError(error => of(new actions.companiesListFail(error.error)))
                )
            )
            ).subscribe((action:any) => {
                this.store.dispatch(action)
            })
        )
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}