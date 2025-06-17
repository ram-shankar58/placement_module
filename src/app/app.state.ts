import { CompaniesState } from "./pages/companies/reducer/companies.state";
import { PlacementEventsState } from "./pages/placement_events/reducer/placement_events.state";

export interface AppState {
    companies: CompaniesState,
    placementEvents: PlacementEventsState
}