import {Map, Record} from 'immutable';

export interface PlacementEventsState extends Map<String, any>{
    addPlacementEvents: any;
    addPlacementEventsLoading: boolean;
}

export const PlacementEventsStateRecord = Record({
    addPlacementEvents: [],
    addPlacementEventsLoading: false
});