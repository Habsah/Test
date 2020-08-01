import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HomeModule } from '../home/home.module';
import { GenderPipe } from 'src/models/gender';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    UsersComponent,
    GenderPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HomeModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UsersModule { }
