import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../app.state';
import * as CareerTrainingsAction from './action/career_trainings.action'
import {addCareerTrainings, addCareerTrainingsLoading, updateCareerTraining, updateCareerTrainingLoading, deleteCareerTraining, deleteCareerTrainingLoading, careerTrainingsList, careerTrainingsListLoading} from './reducer/career_trainings.selector';

@Injectable()
export class careerTrainingsSandbox{
    public addCareerTraining$;
    public addCareerTrainingLoading$;

    public careerTrainingList$;
    public careerTrainingListLoading$;

    public updateCareerTraining$;
    public updateCareerTrainingLoading$;

    public deleteCareerTraining$;
    public deleteCareerTrainingLoading$;

    constructor(protected appState: Store<store.AppState>){
        this.addCareerTraining$ = this.appState.select(addCareerTrainings);
        this.addCareerTrainingLoading$ = this.appState.select(addCareerTrainingsLoading);

        this.careerTrainingList$ = this.appState.select(careerTrainingsList);
        this.careerTrainingListLoading$ = this.appState.select(careerTrainingsListLoading);

        this.updateCareerTraining$ = this.appState.select(updateCareerTraining);
        this.updateCareerTrainingLoading$ = this.appState.select(updateCareerTrainingLoading);

        this.deleteCareerTraining$ = this.appState.select(deleteCareerTraining);
        this.deleteCareerTrainingLoading$=this.appState.select(deleteCareerTrainingLoading);
    }

    public addCareerTraining(params: any){
        this.appState.dispatch(new CareerTrainingsAction.addCareerTraining(params));
    }

    public careerTrainingList(){
        this.appState.dispatch( new CareerTrainingsAction.careerTrainingsList());

    }

    public updateCareerTraining(params: any){
        this.appState.dispatch(new CareerTrainingsAction.updateCareerTraining(params));
    }

    public deleteCareerTraining(params: any){
        this.appState.dispatch (new CareerTrainingsAction.deleteCareerTraining(params));

    }
    


}