import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    IonicPageModule.forChild(SettingPage),
  ],
})
export class SettingPageModule {}
