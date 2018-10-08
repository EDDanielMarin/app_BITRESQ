import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UbicacionPage } from './ubicacion';

@NgModule({
  declarations: [
    UbicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(UbicacionPage),
  ],
})
export class UbicacionPageModule {}
