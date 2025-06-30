import {Map, Record} from 'immutable';

export interface CareerTrainingsState extends Map<String, any>{
    addCareerTraining: any;
    addCareerTrainingLoading: boolean;

    careerTrainingsList: any;
    careerTrainingsListLoading: boolean;

    updateCareerTraining: any;
    updateCareerTrainingLoading: boolean;

    deleteCareerTraining: any;
    deleteCareerTrainingLoading: boolean;

}

export const CareerTrainingsStateRecord = Record({
    addCareerTraining: [],
    addCareerTrainingLoading: false,
    careerTrainingsList: [],
    careerTrainingsListLoading: false,
    updateCareerTraining: [],
    updateCareerTrainingLoading: false,
    deleteCareerTraining: [],
    deleteCareerTrainingLoading: false
});