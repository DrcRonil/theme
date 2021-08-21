import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './Component/login/login.component';
import {FormsModule} from '@angular/forms';

import { RippleModule } from 'primeng/ripple';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {PanelMenuModule} from 'primeng/panelmenu';
import { UserComponent } from './Component/user/user.component';

import { AgGridModule } from 'ag-grid-angular';

import { HttpClientModule } from '@angular/common/http';
import { GridComponent } from './Component/grid/grid.component';
import { ReactiveFormsModule } from '@angular/forms';

export const primeng=[
  RippleModule,
  InputTextModule,
  ButtonModule,
  CheckboxModule,
  RadioButtonModule,
  InputTextareaModule,
  DropdownModule,
  TabViewModule,
  PanelMenuModule
]

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SideMenuComponent,
    LoginComponent,
    UserComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...primeng
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
