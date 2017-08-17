import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PageThreeComponent } from './components/page-three/page-three.component';

const routes: Routes = [
  {path: '', redirectTo: '/page-one', pathMatch: 'full'},
  {path: 'page-one', component: PageOneComponent},
  {path: 'page-two', component: PageTwoComponent},
  {path: 'page-three', component: PageThreeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
