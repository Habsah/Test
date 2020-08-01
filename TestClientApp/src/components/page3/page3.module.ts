import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page3RoutingModule } from './page3-routing.module';
import { Page3Component } from './page3.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    Page3Component,
  ],
  imports: [
    CommonModule,
    Page3RoutingModule,
    HomeModule
  ]
})
export class Page3Module { }
