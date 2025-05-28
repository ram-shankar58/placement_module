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
            return Object.assign({},state, {
                addCompanies: [],
                addCompaniesLoading: true
            });
        
        case actions.ActionTypes.ADD_COMPANIES_SUCCESS:
            return Object.assign({},state, {
                addCompanies: payload,
                addCompaniesLoading: false
            })

        case actions.ActionTypes.ADD_COMPANIES_FAIL:
            return Object.assign({},state, {
                addCompanies: [],
                addCompaniesLoading: false
            })

        default: {
            return state;
        }
    }
}

//export values

export const addCompanies = (state: CompaniesState) => state.addCompanies;
export const addCompaniesLoading = (state: CompaniesState) => state.addCompaniesLoading;
