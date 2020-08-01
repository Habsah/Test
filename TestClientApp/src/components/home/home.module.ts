import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ]
})
export class HomeModule { }
