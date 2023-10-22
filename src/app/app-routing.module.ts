import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { GoldPricesComponent } from './gold-prices/gold-prices.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { ChartFromLastSevenDaysComponent } from './charts/chart-from-last-seven-days/chart-from-last-seven-days.component';
import { ChartFromLastMonthsComponent } from './charts/chart-from-last-months/chart-from-last-months.component';
import { ChartFromLast30DaysComponent } from './charts/chart-from-last-30-days/chart-from-last-30-days.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/currencies', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'currencies', component: CurrenciesComponent },
      { path: 'gold-prices', component: GoldPricesComponent },
    ],
  },
  {
    path: 'detail/:code',
    redirectTo: 'detail/:code/chart-from-seven-days',
    pathMatch: 'full',
  },
  {
    path: 'detail/:code',
    component: CurrencyDetailComponent,
    children: [
      { path: 'chart-from-seven-days', component: ChartFromLastSevenDaysComponent },
      {
        path: 'chart-from-last-months',
        component: ChartFromLastMonthsComponent,
      },
      { path: 'chart-from-one-month', component: ChartFromLast30DaysComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
