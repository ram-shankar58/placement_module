import { Action } from "@ngrx/store"
import { type } from "../../../shared/utility"
import { ResponseInterface } from "../../../shared/interfaces/interface"

export const ActionTypes = {
    ADD_COMPANIES: type('[companies] ADD_COMPANIES LIST'),
    ADD_COMPANIES_SUCCESS: type('[companies] ADD_COMPANIES_SUCCESS LIST'),
    ADD_COMPANIES_FAIL: type('[companies] ADD_COMPANIES_FAIL LIST')
}

//add companies
export class addCompanies implements Action{
    type = ActionTypes.ADD_COMPANIES;
    constructor(public payload:any){
        console.log('action',payload);
    }
}

export class addCompaniesSuccess implements Action{
    type = ActionTypes.ADD_COMPANIES_SUCCESS;
    constructor(public payload:ResponseInterface){
    }
}

export class addCompaniesFail implements Action{
    type = ActionTypes.ADD_COMPANIES_FAIL;
    constructor(public payload:any){
    }
}