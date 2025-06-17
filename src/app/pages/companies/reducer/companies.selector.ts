import { createSelector } from '@ngrx/store';

import * as companiesreducer from './companies.reducer'
import { AppState } from "../../../app.state";

// *************************** PUBLIC API's ****************************
/**
 * Signup store functions
 */

export const getCompaniesState = (State: AppState) => State.companies;

export const addCompanies = createSelector(getCompaniesState, companiesreducer.addCompanies);
export const addCompaniesLoading = createSelector(getCompaniesState, companiesreducer.addCompaniesLoading);

export const companiesList = createSelector(getCompaniesState, companiesreducer.companiesList);
export const companiesListLoading = createSelector(getCompaniesState, companiesreducer.companiesListLoading);

export const updateCompany = createSelector(getCompaniesState, companiesreducer.updateCompany);
export const updateCompanyLoading = createSelector(getCompaniesState, companiesreducer.updateCompanyLoading);
