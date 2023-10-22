import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { ButtonComponent } from './button/button.component';
import { GoldPricesComponent } from './gold-prices/gold-prices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyDetailComponent } from './currency-detail/currency-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart-from-seven-days/chart.component';
import { ChartFromLastMonthsComponent } from './chart-from-last-months/chart-from-last-months.component';
import { ChartFromOneMonthComponent } from './chart-from-one-month/chart-from-one-month.component';
import { MdbModule } from './mdb/mdb.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CurrenciesComponent,
    ButtonComponent,
    GoldPricesComponent,
    CurrencyDetailComponent,
    NavbarComponent,
    FooterComponent,
    ChartComponent,
    ChartFromLastMonthsComponent,
    ChartFromOneMonthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MdbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
