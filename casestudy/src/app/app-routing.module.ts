import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DealerComponent } from './dealer/dealer.component';
import { FarmerComponent } from './farmer/farmer.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
  {path:"",component:MainpageComponent},
  {path:"farmer",component:FarmerComponent},
  {path:"dealer",component:DealerComponent},
  {path:"admin",component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[FarmerComponent,DealerComponent,AdminComponent,MainpageComponent]