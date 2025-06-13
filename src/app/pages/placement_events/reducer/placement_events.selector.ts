import { createSelector } from "@ngrx/store";
import * as placementEventsReducer from './placement_events.reducer'
import { AppState } from "../../../app.state"

//PUBLIC APIS

export const getPlacementEventsState=(State: AppState) => State.placementEvents;
export const addPlacementEvents = createSelector(getPlacementEventsState, placementEventsReducer.addPlacementEvents);
export const addPlacementEventsLoading = createSelector(getPlacementEventsState, placementEventsReducer.addPlacementEventsLoading);