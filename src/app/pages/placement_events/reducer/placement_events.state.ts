import {Map, Record} from 'immutable';

export interface PlacementEventsState extends Map<String, any>{
    addPlacementEvents: any;
    addPlacementEventsLoading: boolean;

    placementEventsList: any;
    placementEventsListLoading: boolean;

    updatePlacementEvent: any;
    updatePlacementEventLoading: boolean;
    
}

export const PlacementEventsStateRecord = Record({
    addPlacementEvents: [],
    addPlacementEventsLoading: false,
    placementEventsList: [],
    placementEventsListLoading: false,
    updatePlacementEvent: [],
    updatePlacementEventLoading: false
});