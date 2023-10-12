import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { ButtonComponent } from './button/button.component';
import { GoldPricesComponent } from './gold-prices/gold-prices.component';
import { FilterInputComponent } from './filter-input/filter-input.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CurrenciesComponent,
    ButtonComponent,
    GoldPricesComponent,
    FilterInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
