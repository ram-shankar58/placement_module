import { createSelector } from "@ngrx/store";
import * as careerTrainingsReducer from './career_trainings.reducer'
import { AppState } from "../../../app.state"

//PUBLIC APIS

export const getCareerTrainingsState=(State: AppState) => State.careerTrainings;
export const addCareerTrainings = createSelector(getCareerTrainingsState, careerTrainingsReducer.addCareerTrainings);
export const addCareerTrainingsLoading = createSelector(getCareerTrainingsState, careerTrainingsReducer.addCareerTrainingsLoading);

export const careerTrainingsList = createSelector(getCareerTrainingsState, careerTrainingsReducer.careerTrainingsList);
export const careerTrainingsListLoading = createSelector(getCareerTrainingsState, careerTrainingsReducer.careerTrainingsListLoading);

export const updateCareerTraining = createSelector(getCareerTrainingsState, careerTrainingsReducer.updateCareerTraining);
export const updateCareerTrainingLoading = createSelector(getCareerTrainingsState, careerTrainingsReducer.updateCareerTrainingLoading);

export const deleteCareerTraining = createSelector(getCareerTrainingsState, careerTrainingsReducer.deleteCareerTraining);
export const deleteCareerTrainingLoading = createSelector(getCareerTrainingsState, careerTrainingsReducer.deleteCareerTrainingLoading);