import { Action } from "@ngrx/store"
import { type } from "../../../shared/utility"
import { ResponseInterface } from "../../../shared/interfaces/interface"

export const ActionTypes = {
    ADD_PLACEMENT_EVENTS: type('[placement_events] ADD_PLACEMENT_EVENTS LIST'),
    ADD_PLACEMENT_EVENTS_SUCCESS: type('[placement_events] ADD_PLACEMENT_EVENTS_SUCCESS LIST'),
    ADD_PLACEMENT_EVENTS_FAIL: type('[placement_events] ADD_PLACEMENT_EVENTS_FAIL LIST')

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
