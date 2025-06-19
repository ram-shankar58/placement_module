import { Map, Record } from 'immutable';

export interface CompaniesState extends Map<string, any> {

    addCompanies: any;
    addCompaniesLoading: boolean;

    companiesList: any;
    companiesListLoading: boolean;

    updateCompany: any;
    updateCompanyLoading: boolean;

    archiveCompany: any;
    archiveCompanyLoading: boolean;

}

export const companiesSateRecord = Record({

    addCompanies: [],
    addCompaniesLoading: false,

    companiesList: [],
    companiesListLoading: false,

    updateCompany: [],
    updateCompanyLoading: false,

    archiveCompany: [],
    archiveCompanyLoading: false,

})