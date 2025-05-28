import { ActionReducerMap,ActionReducer,MetaReducer } from "@ngrx/store";
import { AppState as State } from "./app.state";
import { environment } from "../environments/environment.prod";
import * as companiesReducer from "./pages/companies/reducer/companies.reducer"

export const reducers: ActionReducerMap<State> = {
    companies: companiesReducer.reducer
}

export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
    return function (state: State, action: any): State {
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger]
    : [];