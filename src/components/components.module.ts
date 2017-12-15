import { NgModule } from '@angular/core';
import { MoreComponent } from './more/more';
import { LoginComponent } from './login/login';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
		MoreComponent,
		LoginComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		MoreComponent,
		LoginComponent
	],
	entryComponents: [
		MoreComponent,
		LoginComponent
	]
})
export class ComponentsModule { }
