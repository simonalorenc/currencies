import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ButtonComponent } from './button/button.component';
import { GoldPricesComponent } from './gold-prices/gold-prices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyDetailComponent } from './currency/currency-detail/currency-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartFromLastSevenDaysComponent } from './charts/chart-from-last-seven-days/chart-from-last-seven-days.component';
import { ChartFromLastMonthsComponent } from './charts/chart-from-last-months/chart-from-last-months.component';
import { ChartFromLastDaysComponent } from './charts/chart-from-last-days/chart-from-last-days.component';
import { CurrencyListComponent } from './currency/currency-list/currency-list.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CurrencyListComponent,
    ButtonComponent,
    GoldPricesComponent,
    CurrencyDetailComponent,
    NavbarComponent,
    FooterComponent,
    ChartFromLastSevenDaysComponent,
    ChartFromLastMonthsComponent,
    ChartFromLastDaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgChartsModule,
    CollapseModule.forRoot(),
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
