import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { GoldPricesComponent } from './gold-prices/gold-prices.component';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { ChartComponent } from './chart-from-seven-days/chart.component';
import { ChartFromLastMonthsComponent } from './chart-from-last-months/chart-from-last-months.component';
import { ChartFromOneMonthComponent } from './chart-from-one-month/chart-from-one-month.component';

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
      { path: 'chart-from-seven-days', component: ChartComponent },
      {
        path: 'chart-from-last-months',
        component: ChartFromLastMonthsComponent,
      },
      { path: 'chart-from-one-month', component: ChartFromOneMonthComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
