import { Injectable } from "@angular/core";
import {Store} from "@ngrx/store";
import * as store from '../../app.state' 
import * as CompaniesAction from '../companies/action/companies.action'
import {
    addCompanies,
    addCompaniesLoading,

    companiesList,
    companiesListLoading,

    updateCompany,
    updateCompanyLoading,
} from '../companies/reducer/companies.selector'

@Injectable()
export class CompaniesSanbox {

    public addCompanies$
    public addCompaniesLoading$

    public companiesList$
    public companiesListLoading$

    public updateCompany$
    public updateCompanyLoading$

    constructor(
        protected appState: Store<store.AppState>
    ){
        this.addCompanies$ = this.appState.select(addCompanies);
        this.addCompaniesLoading$ = this.appState.select(addCompaniesLoading);

        this.companiesList$ = this.appState.select(companiesList);
        this.companiesListLoading$ = this.appState.select(companiesListLoading);

        this.updateCompany$ = this.appState.select(updateCompany)
        this.updateCompanyLoading$ = this.appState.select(updateCompanyLoading)
    }

    //add companies
    public addCompanies(params:any){
        this.appState.dispatch(new CompaniesAction.addCompanies(params));
    }

    //companies list
    public companiesList(){
        this.appState.dispatch(new CompaniesAction.companiesList());
    }

    //update company
    public updatecompany(params:any){
        this.appState.dispatch(new CompaniesAction.updateCompany(params));
    }
}