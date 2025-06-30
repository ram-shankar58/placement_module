import { Action } from "@ngrx/store"
import { type } from "../../../shared/utility"
import { ResponseInterface } from "../../../shared/interfaces/interface"

export const ActionTypes = {
    ADD_CAREER_TRAINING: type('[career_training] ADD_CAREER_TRAINING LIST'),
    ADD_CAREER_TRAINING_SUCCESS: type('[career_training] ADD_CAREER_TRAINING_SUCCESS LIST'),
    ADD_CAREER_TRAINING_FAIL: type('[career_training] ADD_CAREER_TRAINING_FAIL LIST'),

    CAREER_TRAININGS_LIST: type('[career_training] CAREER_TRAININGS LIST'),
    CAREER_TRAININGS_LIST_SUCCESS: type('[career_training] CAREER_TRAININGS LIST SUCCESS'),
    CAREER_TRAININGS_LIST_FAIL: type('[career_training] CAREER_TRAININGS LIST FAIL'),

    UPDATE_CAREER_TRAINING: type('[career_training] UPDATE_CAREER_TRAINING'),
    UPDATE_CAREER_TRAINING_SUCCESS: type('[career_training] UPDATE_CAREER_TRAINING SUCCESS'),
    UPDATE_CAREER_TRAINING_FAIL: type('[career_training] UPDATE_CAREER_TRAINING FAIL'),

    DELETE_CAREER_TRAINING: type('[career_training] DELETE_CAREER_TRAINING'),
    DELETE_CAREER_TRAINING_SUCCESS: type('[career_training] DELETE_CAREER_TRAINING SUCCESS'),
    DELETE_CAREER_TRAINING_FAIL: type('[career_training] DELETE_CAREER_TRAINING FAIL')
}

export class addCareerTraining implements Action{
    type=ActionTypes.ADD_CAREER_TRAINING;
    constructor(public payload: any){

    }
}


export class addCareerTrainingSuccess implements Action{
    type=ActionTypes.ADD_CAREER_TRAINING_SUCCESS;
    constructor(public payload: ResponseInterface){}
}

export class addCareerTrainingFail implements Action{
    type=ActionTypes.ADD_CAREER_TRAINING_FAIL;
    constructor(public payload: any){}
}

//career training list
export class careerTrainingsList implements Action{
    type=ActionTypes.CAREER_TRAININGS_LIST;
    constructor(public payload = null){

    }
}

export class careerTrainingsListSuccess implements Action{
    type=ActionTypes.CAREER_TRAININGS_LIST_SUCCESS;
    constructor(public payload: ResponseInterface){

    }
}

export class careerTrainingsListFail implements Action{
    type=ActionTypes.CAREER_TRAININGS_LIST_FAIL;
    constructor(public payload: any){

    }
}



//updating events

export class updateCareerTraining implements Action{
    type=ActionTypes.UPDATE_CAREER_TRAINING;
    constructor(public payload: any){

    }
}

export class updateCareerTrainingSuccess implements Action{
    type=ActionTypes.UPDATE_CAREER_TRAINING_SUCCESS;
    constructor(public payload: ResponseInterface){

    }
}

export class updateCareerTrainingFail implements Action{
    type=ActionTypes.UPDATE_CAREER_TRAINING_FAIL;
    constructor(public payload: any){

    }
}

export class deleteCareerTraining implements Action{
    type=ActionTypes.DELETE_CAREER_TRAINING;
    constructor(public payload: any){

    }
}

export class deleteCareerTrainingSuccess implements Action{
    type=ActionTypes.DELETE_CAREER_TRAINING_SUCCESS;
    constructor(public payload: ResponseInterface){

    }
}

export class deleteCareerTrainingFail implements Action{
    type=ActionTypes.DELETE_CAREER_TRAINING_FAIL;
    constructor(public payload: any){
        
    }
}