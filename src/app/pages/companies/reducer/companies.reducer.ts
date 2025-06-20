import { CompaniesState, companiesSateRecord } from "./companies.state";
import * as actions from '../action/companies.action'

export const initialState: CompaniesState = new companiesSateRecord() as unknown as CompaniesState;

export function reducer(state = initialState, { type, payload }: any): CompaniesState {
    if (!type) {
        return state;
    }

    switch (type) {

        //add Companies
        case actions.ActionTypes.ADD_COMPANIES:
            return Object.assign({}, state, {
                addCompanies: [],
                addCompaniesLoading: true
            });

        case actions.ActionTypes.ADD_COMPANIES_SUCCESS:
            return Object.assign({}, state, {
                addCompanies: payload,
                addCompaniesLoading: false
            })

        case actions.ActionTypes.ADD_COMPANIES_FAIL:
            return Object.assign({}, state, {
                addCompanies: [],
                addCompaniesLoading: false
            })

        //companiesList
        case actions.ActionTypes.COMPANIES_LIST:
            return Object.assign({}, state, {
                companiesList: [],
                companiesListLoading: true
            })

        case actions.ActionTypes.COMPANIES_LIST_SUCCESS:
            return Object.assign({}, state, {
                companiesList: payload,
                companiesListLoading: false
            })

        case actions.ActionTypes.COMPANIES_LIST_FAIL:
            return Object.assign({}, state, {
                companiesList: [],
                companiesListLoading: false
            })

        //updateCompany
        case actions.ActionTypes.UPDATE_COMPANY:
            return Object.assign({}, state, {
                updateCompany: [],
                updateCompanyLoading: true
            })

        case actions.ActionTypes.UPDATE_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                updateCompany: payload,
                updateCompanyLoading: false
            })

        case actions.ActionTypes.UPDATE_COMPANY_FAIL:
            return Object.assign({}, state, {
                updateCompany: [],
                updateCompanyLoading: false
            })

        case actions.ActionTypes.ARCHIVE_COMPANY:
            return Object.assign({},state, {
                archiveCompany: [],
                archiveCompanyLoading: true
            })

        case actions.ActionTypes.ARCHIVE_COMPANY_SUCCESS:
            return Object.assign({},state, {
                archiveCompany: payload,
                archiveCompanyLoading: false
            })

        case actions.ActionTypes.ARCHIVE_COMAPANY_FAIL:
            return Object.assign({},state, {
                archiveCompany: [],
                archiveCompanyLoading: false
            })

        default: {
            return state;
        }
    }
}

//export values

export const addCompanies = (state: CompaniesState) => state.addCompanies;
export const addCompaniesLoading = (state: CompaniesState) => state.addCompaniesLoading;

export const companiesList = (state: CompaniesState) => state.companiesList;
export const companiesListLoading = (state: CompaniesState) => state.companiesListLoading

export const updateCompany = (state: CompaniesState) => state.updateCompany;
export const updateCompanyLoading = (state: CompaniesState) => state.updateCompanyLoading;

export const archiveCompany = (state: CompaniesState) => state.archiveCompany;
export const archiveCompanyLoading = (state: CompaniesState) => state.archiveCompanyLoading;
