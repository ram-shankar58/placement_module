import { Action } from "@ngrx/store"
import { type } from "../../../shared/utility"
import { ResponseInterface } from "../../../shared/interfaces/interface"

export const ActionTypes = {
    ADD_PLACEMENT_EVENTS: type('[placement_events] ADD_PLACEMENT_EVENTS LIST'),
    ADD_PLACEMENT_EVENTS_SUCCESS: type('[placement_events] ADD_PLACEMENT_EVENTS_SUCCESS LIST'),
    ADD_PLACEMENT_EVENTS_FAIL: type('[placement_events] ADD_PLACEMENT_EVENTS_FAIL LIST'),

    PLACEMENT_EVENTS_LIST: type('[placement_events] PLACEMENT_EVENTS LIST'),
    PLACEMENT_EVENTS_LIST_SUCCESS: type('[placement_events] PLACEMENT_EVENTS LIST SUCCESS'),
    PLACEMENT_EVENTS_LIST_FAIL: type('[placement_events] PLACEMENT_EVENTS LIST FAIL'),

    UPDATE_PLACEMENT_EVENT: type('[placement_events] UPDATE PLACEMENT_EVENT'),
    UPDATE_PLACEMENT_EVENT_SUCCESS: type('[placement_events] UPDATE PLACEMENT_EVENT SUCCESS'),
    UPDATE_PLACEMENT_EVENT_FAIL: type('[placement_events] UPDATE PLACEMENT_EVENT FAIL'),
    
}

export class addPlacementEvents implements Action{
    type=ActionTypes.ADD_PLACEMENT_EVENTS;
    constructor(public payload: any){

    }
}


export class addPlacementEventsSuccess implements Action{
    type=ActionTypes.ADD_PLACEMENT_EVENTS_SUCCESS;
    constructor(public payload: ResponseInterface){}
}

export class addPlacementEventsFail implements Action{
    type=ActionTypes.ADD_PLACEMENT_EVENTS_FAIL;
    constructor(public payload: any){}
}

//placement events list

export class placementEventsList implements Action{
    type=ActionTypes.PLACEMENT_EVENTS_LIST;
    constructor(public payload = null){

    }
}

export class placementEventsListSuccess implements Action{
    type=ActionTypes.PLACEMENT_EVENTS_LIST_SUCCESS;
    constructor(public payload: ResponseInterface){

    }
}

export class placementEventsListFail implements Action{
    type=ActionTypes.PLACEMENT_EVENTS_LIST_FAIL;
    constructor(public payload: any){

    }
}



//updating events

export class updatePlacementEvent implements Action{
    type=ActionTypes.UPDATE_PLACEMENT_EVENT;
    constructor(public payload: any){

    }
}

export class updatePlacementEventSuccess implements Action{
    type=ActionTypes.UPDATE_PLACEMENT_EVENT_SUCCESS;
    constructor(public payload: ResponseInterface){

    }
}

export class updatePlacementEventFail implements Action{
    type=ActionTypes.UPDATE_PLACEMENT_EVENT_FAIL;
    constructor(public payload: any){

    }
}