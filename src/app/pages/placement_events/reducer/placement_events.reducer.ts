import { PlacementEventsState, PlacementEventsStateRecord } from "./placement_events.state";
import * as actions from '../action/placement_events.action';
import { StateObservable } from "@ngrx/store";

export const initialState: PlacementEventsState = new PlacementEventsStateRecord() as unknown as PlacementEventsState;

export function reducer(state = initialState, {type, payload }: any): PlacementEventsState {
    if(!type){
        return state;
    }

    switch(type){
        //adding placement events

        case actions.ActionTypes.ADD_PLACEMENT_EVENTS:
            return Object.assign({}, state, {
                addPlacementEvents: [],
                addPlacementEventsLoading: true
            });

        case actions.ActionTypes.ADD_PLACEMENT_EVENTS_SUCCESS:
            return Object.assign({}, state, {
                addPlacementEvents: payload,
                addPlacementsLoading: false
            })

        case actions.ActionTypes.ADD_PLACEMENT_EVENTS_FAIL:
            return Object.assign({}, state, {
                addPlacementEvents:[],
                addPlacementEventsLoading: false
            })

        default: {
            return state;
        }
    }
}

export const addPlacementEvents = (state: PlacementEventsState) => state.addPlacementEvents;
export const addPlacementEventsLoading = (state: PlacementEventsState) => state.addPlacementEventsLoading;
