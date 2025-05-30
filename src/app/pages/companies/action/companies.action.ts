import { Action } from "@ngrx/store"
import { type } from "../../../shared/utility"
import { ResponseInterface } from "../../../shared/interfaces/interface"

export const ActionTypes = {
    ADD_COMPANIES: type('[companies] ADD_COMPANIES LIST'),
    ADD_COMPANIES_SUCCESS: type('[companies] ADD_COMPANIES_SUCCESS LIST'),
    ADD_COMPANIES_FAIL: type('[companies] ADD_COMPANIES_FAIL LIST'),

    COMPANIES_LIST:  type('[companies] COMPANIES LIST'),
    COMPANIES_LIST_SUCCESS:  type('[companies] COMPANIES LIST SUCCESS'),
    COMPANIES_LIST_FAIL:  type('[companies] COMPANIES LIST FAIL'),
}

//add companies
export class addCompanies implements Action{
    type = ActionTypes.ADD_COMPANIES;
    constructor(public payload:any){
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

//companiesList
export class companiesList implements Action{
    type = ActionTypes.COMPANIES_LIST;
    constructor(public payload = null){
    }
}

export class companiesListSuccess implements Action{
    type = ActionTypes.COMPANIES_LIST_SUCCESS;
    constructor(public payload:ResponseInterface){
    }
}

export class companiesListFail implements Action{
    type = ActionTypes.COMPANIES_LIST_FAIL;
    constructor(public payload: any){
    }
}