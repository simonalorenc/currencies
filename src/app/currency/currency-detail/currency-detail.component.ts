import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyRate } from '../data/currency-exchange-table-dto';
import { ExchangeRateService } from '../data/exchange-rate.service';
import { FlagsService } from '../data/flags.service';
import { CurrenciesRepository } from '../data/currencies-repository';
import { ActiveChart } from '../data/active-chart.enum';
import { CurrencyTranslationService } from '../data/currency.translation.service';
import { IconDefinition, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FavouritesRatesService } from 'src/app/favourites-rates.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit {
  private NUMBER_OF_LAST_DAYS: number = 7

  ActiveChart = ActiveChart

  name!: string
  code!: string;
  flagUrl!: string;
  detailCurrencyRates: CurrencyRate[] = [];
  activeChart: ActiveChart = ActiveChart.LastSevenDays;
  emptyHeartIcon: IconDefinition = farHeart;
  fullHeartIcon: IconDefinition = fasHeart;
  isRateInFavourites: boolean = false

  constructor(
    private route: ActivatedRoute,
    private exchangeRateService: ExchangeRateService,
    private flagsService: FlagsService,
    private currenciesRepository: CurrenciesRepository,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string,
    private currencyTranslationService: CurrencyTranslationService,
    private favouritesRatesService: FavouritesRatesService
  ) {
    this.code = this.route.snapshot.paramMap.get('code')!;
  }

  ngOnInit(): void {
    this.getCurrencyDetailsAndFlagUrl();
    this.isRateInFavourites = this.favouritesRatesService.checkIfDetailIsInFavourites(this.code)
  }

  private getCurrencyDetailsAndFlagUrl(): void {
    const countryCode = this.currenciesRepository.getCountryCode(this.code);
    this.getCurrencyDetails(this.code);
    this.flagUrl = this.flagsService.getFlagUrl(countryCode);
  }

  private getCurrencyDetails(code: string): void {
    this.exchangeRateService
      .getCurrencyExchangeTableDtoFromLastDays(code, this.NUMBER_OF_LAST_DAYS)
      .subscribe((currency) => {
        this.currencyTranslationService.updateDetailCurrency(this.locale, currency)
        this.name = currency.currency
        const currencyRatesDto = currency.rates.reverse();
        this.detailCurrencyRates = currencyRatesDto.map(rate => new CurrencyRate(rate))
      });
  }

  isChartFromLastSevenDaysActive(): void {
    this.activeChart = ActiveChart.LastSevenDays
    this.router.navigate([`detail/${this.code}/chart-from-last-seven-days`])
  }

  isChartFromLast30DaysActive(): void {
    this.activeChart = ActiveChart.Last30Days
    this.router.navigate([`detail/${this.code}/chart-from-last-30-days`])
  }

  isChartFromLastMonthsActive(): void {
    this.activeChart = ActiveChart.LastMonths
    this.router.navigate([`detail/${this.code}/chart-from-last-months`])
  }

  addToFavouriteInDetail(code: string): void {
    this.favouritesRatesService.addToFavouriteInDetail(code)
    this.isRateInFavourites = !this.isRateInFavourites
  }

  removeToFavouritesInDetail(code: string): void {
    this.favouritesRatesService.removeToFavouritesInDetail(code)
    this.isRateInFavourites = !this.isRateInFavourites
  }
}

