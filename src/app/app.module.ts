import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule, } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CustomRouterStateSerializer } from './shared/utils';
import { metaReducers, reducers } from './reducers';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PageThreeComponent } from './components/page-three/page-three.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { ChatEffects } from './components/chat/chat.effects';
import { AppMaterialModule } from './app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    ChatComponent,
  ],
  imports: [
    AppRoutingModule,
    AppMaterialModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ChatEffects]),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
