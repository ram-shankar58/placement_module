import { CompaniesState } from "./pages/companies/reducer/companies.state";
import { PlacementEventsState } from "./pages/placement_events/reducer/placement_events.state";
import { CareerTrainingsState } from "./pages/career_trainings/reducer/career_trainings.state";

export interface AppState {
    companies: CompaniesState,
    placementEvents: PlacementEventsState,
    careerTrainings: CareerTrainingsState
}