import { PlacementEventsState, PlacementEventsStateRecord } from "./placement_events.state";
import * as actions from '../action/placement_events.action';
import { State, StateObservable } from "@ngrx/store";

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

        //placement events list
        case actions.ActionTypes.PLACEMENT_EVENTS_LIST:
            return Object.assign({}, state, {
                placementEventsList: [],
                placementEventsListLoading: true
            })

        case actions.ActionTypes.PLACEMENT_EVENTS_LIST_SUCCESS:
            return Object.assign({}, state, {
                placementEventsList: payload,
                placementEventsListLoading: false
            })

        case actions.ActionTypes.PLACEMENT_EVENTS_LIST_FAIL:
            return Object.assign({}, state, {
                placementEventsList: [],
                placementEventsListLoading: false
            })

        //update placement event
        case actions.ActionTypes.UPDATE_PLACEMENT_EVENT:
            return Object.assign({}, state, {
                updatePlacementEvent: [],
                updatePlacementEventLoading: true
            })  
        case actions.ActionTypes.UPDATE_PLACEMENT_EVENT_SUCCESS:
            return Object.assign({}, state, {
                updatePlacementEvent: payload,
                updatePlacementEventLoading: false
            })          
        
        case actions.ActionTypes.UPDATE_PLACEMENT_EVENT_FAIL:
            return Object.assign({}, state, {
                updatePlacementEvent: [],
                updatePlacementEventLoading: false
            })
            
        case actions.ActionTypes.DELETE_PLACEMENT_EVENT:
            return Object.assign({}, state, {
                deletePlacementEvent: [],
                deletePlacementEventLoading: true
            })

        case actions.ActionTypes.DELETE_PLACEMENT_EVENT_SUCCESS:
            return Object.assign({}, state, {
                deletePlacementEvent: payload,
                deletePlacementEventLoading: false
            })

        case actions.ActionTypes.DELETE_PLACEMENT_EVENT_FAIL:
            return Object.assign({}, state, {
                deletePlacementEvent: [],
                deletePlacementEventLoading: false
            })

        default: {
            return state;
        }
    }
}

export const addPlacementEvents = (state: PlacementEventsState) => state.addPlacementEvents;
export const addPlacementEventsLoading = (state: PlacementEventsState) => state.addPlacementEventsLoading;

export const placementEventsList = (state: PlacementEventsState) => state.placementEventsList;
export const placementEventsListLoading = (state: PlacementEventsState) => state.placementEventsListLoading;

export const updatePlacementEvent = (state: PlacementEventsState) => state.updatePlacementEvent;
export const updatePlacementEventLoading = (state: PlacementEventsState) => state.updatePlacementEventLoading;

export const deletePlacementEvent = (state: PlacementEventsState) => state.deletePlacementEvent;
export const deletePlacementEventLoading = (state: PlacementEventsState)  => state.deletePlacementEventLoading;