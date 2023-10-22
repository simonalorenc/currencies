import { Component, OnInit } from '@angular/core';
import { GoldPriceService } from './data/gold-price.service';
import { GoldPrice } from './data/gold-price';

@Component({
  selector: 'app-gold-prices',
  templateUrl: './gold-prices.component.html',
  styleUrls: ['./gold-prices.component.scss'],
})
export class GoldPricesComponent implements OnInit {
  goldPrices: GoldPrice[] = [];

  constructor(private goldPriceService: GoldPriceService) {
  }

  ngOnInit(): void {
    this.getGoldPricesFromLastDays()
  }

  private getGoldPricesFromLastDays() {
    this.goldPriceService.getGoldPricesDtoFromLastDays().subscribe(
      result => {
        const goldPricesFromNewest = result.reverse()
        this.goldPrices = goldPricesFromNewest.map(dto => new GoldPrice(dto))
      }
    );
  }

}
