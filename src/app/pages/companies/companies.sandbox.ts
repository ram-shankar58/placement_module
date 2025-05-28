import { Injectable } from "@angular/core";
import {Store} from "@ngrx/store";
import * as store from '../../app.state' 
import * as CompaniesAction from '../companies/action/companies.action'
import {
    addCompanies,
    addCompaniesLoading,
} from '../companies/reducer/companies.selector'

@Injectable()
export class CompaniesSanbox {

    public addCompanies$
    public addCompaniesLoading$

    constructor(
        protected appState: Store<store.AppState>
    ){
        this.addCompanies$ = this.appState.select(addCompanies);
        this.addCompaniesLoading$ = this.appState.select(addCompaniesLoading)
    }

    //add companies
    addCompanies(params:any){
        console.log('sandbox',params);
        this.appState.dispatch(new CompaniesAction.addCompanies(params));
    }
}