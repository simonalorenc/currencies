import { Component, OnInit } from '@angular/core';
import { GoldPrice } from './gold-prices-dto';
import { GoldPriceService } from './gold-price.service';

@Component({
  selector: 'app-gold-prices',
  templateUrl: './gold-prices.component.html',
  styleUrls: ['./gold-prices.component.scss'],
})
export class GoldPricesComponent implements OnInit {
  goldPrices: GoldPrice[] = [];

  constructor(private goldPricesService: GoldPriceService) {
  }

  ngOnInit(): void {
    this.getGoldPricesFromLastDays()
  }

  private getGoldPricesFromLastDays() {
    this.goldPricesService.getGoldPricesDtoFromLastDays().subscribe(
      result => {
        const goldPricesFromNewest = result.reverse()
        this.goldPrices = goldPricesFromNewest.map(dto => new GoldPrice(dto))
      }
    );
  }

}
