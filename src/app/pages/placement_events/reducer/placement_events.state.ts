import {Map, Record} from 'immutable';

export interface PlacementState extends Map<String, any>{
    addPlacementEvents: any;
    addPlacementEventsLoading: boolean;
}

export const PlacementStateRecord = Record({
    addPlacementEvents: [],
    addPlacementEventsLoading: false
});