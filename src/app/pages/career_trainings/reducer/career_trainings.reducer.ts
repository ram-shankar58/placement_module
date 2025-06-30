import { CareerTrainingsStateRecord, CareerTrainingsState } from "./career_trainings.state";
import * as actions from '../action/career_trainings.action';
import { State, StateObservable } from "@ngrx/store";

export const initialState: CareerTrainingsState = new CareerTrainingsStateRecord() as unknown as CareerTrainingsState;

export function reducer(state = initialState, {type, payload }: any): CareerTrainingsState {
    if(!type){
        return state;
    }

    switch(type){
        //adding career trainings

        case actions.ActionTypes.ADD_CAREER_TRAINING:
            return Object.assign({}, state, {
                addCareerTraining: [],
                addCareerTrainingLoading: true
            });

        case actions.ActionTypes.ADD_CAREER_TRAINING_SUCCESS:
            return Object.assign({}, state, {
                addCareerTraining: payload,
                addCareerTrainingLoading: false
            })

        case actions.ActionTypes.ADD_CAREER_TRAINING_FAIL:
            return Object.assign({}, state, {
                addCareerTraining: [],
                addCareerTrainingLoading: false
            })

        //career trainings list
        case actions.ActionTypes.CAREER_TRAININGS_LIST:
            return Object.assign({}, state, {
                careerTrainingsList: [],
                careerTrainingsListLoading: true
            })

        case actions.ActionTypes.CAREER_TRAININGS_LIST_SUCCESS:
            return Object.assign({}, state, {
                careerTrainingsList: payload,
                careerTrainingsListLoading: false
            })

        case actions.ActionTypes.CAREER_TRAININGS_LIST_FAIL:
            return Object.assign({}, state, {
                careerTrainingsList: [],
                careerTrainingsListLoading: false
            })

        //update career training
        case actions.ActionTypes.UPDATE_CAREER_TRAINING:
            return Object.assign({}, state, {
                updateCareerTraining: [],
                updateCareerTrainingLoading: true
            })
        case actions.ActionTypes.UPDATE_CAREER_TRAINING_SUCCESS:
            return Object.assign({}, state, {
                updateCareerTraining: payload,
                updateCareerTrainingLoading: false
            })

        case actions.ActionTypes.UPDATE_CAREER_TRAINING_FAIL:
            return Object.assign({}, state, {
                updateCareerTraining: [],
                updateCareerTrainingLoading: false
            })

        case actions.ActionTypes.DELETE_CAREER_TRAINING:
            return Object.assign({}, state, {
                deleteCareerTraining: [],
                deleteCareerTrainingLoading: true
            })

        case actions.ActionTypes.DELETE_CAREER_TRAINING_SUCCESS:
            return Object.assign({}, state, {
                deleteCareerTraining: payload,
                deleteCareerTrainingLoading: false
            })

        case actions.ActionTypes.DELETE_CAREER_TRAINING_FAIL:
            return Object.assign({}, state, {
                deleteCareerTraining: [],
                deleteCareerTrainingLoading: false
            })

        default: {
            return state;
        }
    }
}

export const addCareerTrainings = (state: CareerTrainingsState) => state.addCareerTraining;
export const addCareerTrainingsLoading = (state: CareerTrainingsState) => state.addCareerTrainingLoading;

export const careerTrainingsList = (state: CareerTrainingsState) => state.careerTrainingsList;
export const careerTrainingsListLoading = (state: CareerTrainingsState) => state.careerTrainingsListLoading;

export const updateCareerTraining = (state: CareerTrainingsState) => state.updateCareerTraining;
export const updateCareerTrainingLoading = (state: CareerTrainingsState) => state.updateCareerTrainingLoading;

export const deleteCareerTraining = (state: CareerTrainingsState) => state.deleteCareerTraining;
export const deleteCareerTrainingLoading = (state: CareerTrainingsState)  => state.deleteCareerTrainingLoading;