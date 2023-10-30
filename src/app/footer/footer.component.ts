import { Component } from '@angular/core';
import { CurrenciesGoldRoutingService } from '../currencies-gold-routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private currenciesGoldRoutingService: CurrenciesGoldRoutingService, private router: Router) {}

  onClickCurrencies() {
    
    this.currenciesGoldRoutingService.onClickCurrencies()
  }
}
