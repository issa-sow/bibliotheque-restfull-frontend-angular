import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientService } from './services/client.service';
import { MenuComponent } from './menu/menu.component';

import { RouterModule, Routes } from '@angular/router';
import { ClientPageComponent } from './client/client-page/client-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewClientComponent } from './client/new-client/new-client.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'client/list-client', component: ClientPageComponent },
  { path: 'client/new-client', component: NewClientComponent },
  { path: 'client/:id', component: ClientPageComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClientPageComponent,
    NewClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
