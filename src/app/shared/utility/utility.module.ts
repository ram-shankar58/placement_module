

import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule()
export class UtilityModule {
    static forRoot(): ModuleWithProviders<UtilityModule> {
        return {
            ngModule: UtilityModule,
            providers: []
        };
    }
}
