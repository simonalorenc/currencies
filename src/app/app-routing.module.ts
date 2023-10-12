import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { GoldPricesComponent } from './gold-prices/gold-prices.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/currencies', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'currencies', component: CurrenciesComponent },
    { path: 'gold-prices', component: GoldPricesComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
